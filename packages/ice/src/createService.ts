import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName } from 'build-scripts';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import Generator from './service/runtimeGenerator.js';
import { createEsbuildCompiler } from './service/compile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import getContextConfig from './utils/getContextConfig.js';
import getWatchEvents from './getWatchEvents.js';
import { getAppConfig } from './analyzeRuntime.js';
import { defineRuntimeEnv, updateRuntimeEnv } from './utils/runtimeEnv.js';
import { generateRoutesInfo } from './routes.js';
import webPlugin from './plugins/web/index.js';
import configPlugin from './plugins/config.js';

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
    // watchEvents: getWatchEvents({
    //   generator,
    //   rootDir,
    //   targetDir,
    //   templateDir,
    //   configFile,
    //   cache: dataCache,
    //   getCtx,
    // }),
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

  const ctx = new Context<any, ExtendsPluginAPI>({
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
      context: {},
    },
    getBuiltInPlugins: () => {
      return [webPlugin, configPlugin];
    },
  });
  await ctx.resolveConfig();
  const { userConfig: { routes: routesConfig } } = ctx;
  const routesRenderData = generateRoutesInfo(rootDir, routesConfig);
  generator.modifyRenderData((renderData) => ({
    ...renderData,
    ...routesRenderData,
  }));
  dataCache.set('routes', JSON.stringify(routesRenderData));

  generator.setPlugins(ctx.getAllPlugin());
  await ctx.setup();

  // render template before webpack compile
  const renderStart = new Date().getTime();

  generator.render();

  addWatchEvent(
    ...getWatchEvents({ generator, targetDir, templateDir, cache: dataCache, ctx }),
  );

  consola.debug('template render cost:', new Date().getTime() - renderStart);

  // define runtime env before get webpack config
  defineRuntimeEnv();

  const contextConfig = getContextConfig(ctx);
  const webTask = contextConfig.find(({ name }) => name === 'web');
  const esbuildCompile = createEsbuildCompiler({
    alias: webTask.webpackConfig.resolve.alias as Record<string, string>,
    getTransformPlugins: webTask.getTransformPlugins,
  });

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx, contextConfig, esbuildCompile);
      } else if (command === 'build') {
        const appConfig = await getAppConfig({ esbuildCompile, rootDir });
        updateRuntimeEnv(appConfig, routesRenderData.routeManifest);
        return await build(ctx, contextConfig, esbuildCompile);
      }
    },
  };
}


export default createService;