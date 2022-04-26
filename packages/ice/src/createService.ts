import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { Config } from '@ice/types';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import Generator from './service/runtimeGenerator.js';
import { createServerCompiler } from './service/serverCompiler.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import mergeTaskConfig from './utils/mergeTaskConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { getAppConfig } from './analyzeRuntime.js';
import { defineRuntimeEnv, updateRuntimeEnv } from './utils/runtimeEnv.js';
import getRuntimeModules from './utils/getRuntimeModules.js';
import { generateRoutesInfo } from './routes.js';
import getWebTask from './tasks/web/index.js';
import * as config from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
}

async function createService({ rootDir, command, commandArgs }: CreateServiceOptions) {
  const targetDir = '.ice';
  const templateDir = path.join(__dirname, '../template/');
  const configFile = 'ice.config.(mts|mjs|ts|js|cjs|json)';
  const dataCache = new Map<string, string>();
  const generator = new Generator({
    rootDir,
    targetDir,
    // add default template of ice
    templates: [templateDir],
  });

  const { addWatchEvent, removeWatchEvent } = createWatch({
    watchDir: rootDir,
    command,
  });

  const generatorAPI = {
    addExport: (exportData: ExportData) => {
      generator.addExport('framework', exportData);
    },
    addExportTypes: (exportData: ExportData) => {
      generator.addExport('frameworkTypes', exportData);
    },
    addConfigTypes: (exportData: ExportData) => {
      generator.addExport('configTypes', exportData);
    },
    addRenderFile: generator.addRenderFile,
    addRenderTemplate: generator.addTemplateFiles,
  };

  const ctx = new Context<Config, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    configFile,
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        // @ts-expect-error repack type can not match with original type
        webpack,
      },
    },
  });
  // get userConfig from ice.config.ts
  const userConfig = await ctx.resolveUserConfig();
  // get plugins include built-in plugins and custom plugins
  const plugins = await ctx.resolvePlugins();
  const runtimeModules = getRuntimeModules(plugins);
  const { routes: routesConfig } = userConfig;
  // register web
  ctx.registerTask('web', getWebTask({ rootDir, command }));
  // register config
  ['userConfig', 'cliOption'].forEach((configType) => ctx.registerConfig(configType, config[configType]));
  const routesRenderData = generateRoutesInfo(rootDir, routesConfig);
  // add render data
  generator.setRenderData({ ...routesRenderData, runtimeModules });
  dataCache.set('routes', JSON.stringify(routesRenderData.routeManifest));

  let taskConfigs = await ctx.setup();

  // render template before webpack compile
  const renderStart = new Date().getTime();

  generator.render();

  addWatchEvent(
    ...getWatchEvents({ generator, targetDir, templateDir, cache: dataCache, ctx }),
  );

  consola.debug('template render cost:', new Date().getTime() - renderStart);

  // define runtime env before get webpack config
  defineRuntimeEnv();
  const compileIncludes = runtimeModules.map(({ name }) => `${name}/runtime`);

  // merge task config with built-in config
  taskConfigs = mergeTaskConfig(taskConfigs, { compileIncludes, port: commandArgs.port });

  const webTask = taskConfigs.find(({ name }) => name === 'web');

  // create serverCompiler with task config
  const serverCompiler = createServerCompiler({
    rootDir,
    task: webTask,
  });

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx, taskConfigs, serverCompiler);
      } else if (command === 'build') {
        const appConfig = await getAppConfig({ serverCompiler, rootDir });
        updateRuntimeEnv(appConfig, routesRenderData.routeManifest);
        return await build(ctx, taskConfigs, serverCompiler);
      }
    },
  };
}


export default createService;