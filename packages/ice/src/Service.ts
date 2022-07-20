import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName, TaskConfig } from 'build-scripts';
import type { AppConfig, Config } from '@ice/types';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import type { WatchHandle } from './service/watchSource.js';
import createWatch from './service/watchSource.js';
import mergeTaskConfig from './utils/mergeTaskConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { compileAppConfig } from './analyzeRuntime.js';
import { initProcessEnv, updateRuntimeEnv, getCoreEnvKeys } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import getWebTask from './tasks/web/index.js';
import getDataLoaderTask from './tasks/web/data-loader.js';
import * as config from './config.js';
import createSpinner from './utils/createSpinner.js';
import { RUNTIME_TMP_DIR } from './constant.js';
import ServerCompileTask from './utils/ServerCompileTask.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

enum ServiceStatus {
  INITIALIZED = 'initialized',
  STOPPED = 'stopped',
  RUNNING = 'running',
  FINALIZED = 'finalized',
}

interface Service {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  finalize: () => Promise<void>;
  status: ServiceStatus;
}

export default class AppService implements Service {
  status: ServiceStatus;
  options: CreateServiceOptions;
  spinner: any;
  runtimeGenerator: Generator;
  cache: Map<string, string>;
  watchHandle: WatchHandle;
  context: Context<Config, ExtendsPluginAPI>;
  serverCompileTask: ServerCompileTask;
  serverCompiler: ServerCompiler;
  taskConfigs: TaskConfig<Config, string>[];
  routesInfo: any;
  appConfig: AppConfig;

  constructor(options: CreateServiceOptions) {
    const { rootDir, command, commandArgs } = options;
    this.options = options;
    this.status = ServiceStatus.INITIALIZED;
    this.spinner = createSpinner('Initializing...');
    this.cache = new Map<string, string>();
    this.runtimeGenerator = new Generator({
      rootDir,
      targetDir: RUNTIME_TMP_DIR,
      // add default template of ice
      templates: [path.join(__dirname, '../templates/')],
    });
    this.watchHandle = createWatch({ watchDir: rootDir, command });
    this.serverCompileTask = new ServerCompileTask();
    this.context = new Context<Config, ExtendsPluginAPI>({
      rootDir,
      command,
      commandArgs,
      configFile: 'ice.config.(mts|mjs|ts|js|cjs|json)',
      extendsPluginAPI: {
        generator: {
          addExport: (exportData: ExportData) => {
            this.runtimeGenerator.addExport('framework', exportData);
          },
          addExportTypes: (exportData: ExportData) => {
            this.runtimeGenerator.addExport('frameworkTypes', exportData);
          },
          addRenderFile: this.runtimeGenerator.addRenderFile,
          addRenderTemplate: this.runtimeGenerator.addTemplateFiles,
        },
        watch: {
          addEvent: this.watchHandle.addWatchEvent,
          removeEvent: this.watchHandle.removeWatchEvent,
        },
        context: {
          // @ts-expect-error repack type can not match with original type
          webpack,
        },
        serverCompileTask: this.serverCompileTask,
      },
    });
  }

  async start() {
    const { rootDir, command, commandArgs } = this.options;
    // Resolve userConfig from ice.config.ts before registerConfig.
    await this.context.resolveUserConfig();
    // Get plugins include built-in plugins and custom plugins.
    const plugins = await this.context.resolvePlugins();
    const runtimeModules = getRuntimeModules(plugins);

    // Register web task.
    this.context.registerTask('web', getWebTask({ rootDir, command }));

    // Register data-loader task.
    this.context.registerTask('data-loader', getDataLoaderTask({ rootDir, command }));

    // Register config task.
    ['userConfig', 'cliOption'].forEach((configType) => this.context.registerConfig(configType, config[configType]));

    // Merge task config with built-in config.
    const taskConfigs = mergeTaskConfig(await this.context.setup(), { port: commandArgs.port });
    const webTaskConfig = taskConfigs.find(({ name }) => name === 'web');
    this.taskConfigs = taskConfigs;

    // Get userConfig after setup for userConfig maybe modified by plugins.
    const { userConfig } = this.context;
    const { routes: routesConfig, server } = userConfig;

    // Load dotenv, set to process.env
    await initProcessEnv(rootDir, command, commandArgs);
    const coreEnvKeys = getCoreEnvKeys();

    const routesInfo = await generateRoutesInfo(rootDir, routesConfig);
    this.routesInfo = routesInfo;

    const csr = !userConfig.ssr && !userConfig.ssg;

    // Add render data.
    this.runtimeGenerator.setRenderData({
      ...routesInfo,
      runtimeModules,
      coreEnvKeys,
      basename: webTaskConfig.config.basename,
      hydrate: !csr,
    });
    this.cache.set('routes', JSON.stringify(routesInfo.routeManifest));

    // render template before webpack compile
    const renderStart = new Date().getTime();
    this.runtimeGenerator.render();
    consola.debug('template render cost:', new Date().getTime() - renderStart);

    // Create serverCompiler with task config.
    this.serverCompiler = createServerCompiler({
      rootDir,
      task: webTaskConfig,
      command,
      server,
    });

    this.watchHandle.addWatchEvent(
      ...getWatchEvents({
        generator: this.runtimeGenerator,
        targetDir: RUNTIME_TMP_DIR,
        templateDir: path.join(__dirname, '../templates/'),
        cache: this.cache,
        ctx: this.context,
        serverCompiler: this.serverCompiler,
      }),
    );

    try {
      // should after generator, otherwise it will compile error
      this.appConfig = await compileAppConfig({ serverCompiler: this.serverCompiler, rootDir });
    } catch (err) {
      consola.warn('Failed to get app config:', err.message);
      consola.debug(err);
    }

    const disableRouter = userConfig.removeHistoryDeadCode && routesInfo.routesCount <= 1;
    if (disableRouter) {
      consola.info('[ICE] removeHistoryDeadCode is enabled and only have one route, ice build will remove history and react-router dead code.');
    }
    updateRuntimeEnv(this.appConfig, { disableRouter });

    // Update service status for running.
    this.status = ServiceStatus.RUNNING;
  }


  async stop() {
    this.status = ServiceStatus.STOPPED;
  }

  async finalize() {
    this.cache.clear();
    this.runtimeGenerator = null;
    this.serverCompiler = null;
    this.serverCompileTask = null;
    this.watchHandle = null;
    this.context = null;
    this.routesInfo = null;
    this.appConfig = null;
    this.status = ServiceStatus.FINALIZED;
  }
}
