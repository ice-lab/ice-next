import path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import type { CommandArgs, CommandName, IGetBuiltInPlugins } from 'build-scripts';
import Generator from './service/runtimeGenerator.js';
import preCompile from './service/preCompile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface CreateServiceOptions {
  rootDir: string;
  command: CommandName;
  commandArgs: CommandArgs;
  getBuiltInPlugins: IGetBuiltInPlugins;
}

async function createService({ rootDir, command, commandArgs, getBuiltInPlugins }: CreateServiceOptions) {
  // TODO pre compile
  preCompile();
  const routeManifest = {};
  const generator = new Generator({
    rootDir,
    targetDir: './.ice',
     // TODO get default Data
    defaultData: {},
  });
  // add default template of ice
  const templatePath = path.join(__dirname, '../template/');
  generator.addTemplateFiles(templatePath);
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
  const { addWatchEvent, removeWatchEvent } = createWatch(path.join(rootDir, 'src'));
  const ctx = new Context<any, ExtendsPluginAPI>({
    rootDir,
    command,
    commandArgs,
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        routeManifest,
      },
    },
    getBuiltInPlugins,
  });
  await ctx.resolveConfig();
  generator.setPlugins(ctx.getAllPlugin());
  await ctx.setup();
  // render template before webpack compile
  const renderStart = new Date().getTime();
  generator.render();
  consola.debug('template render cost:', new Date().getTime() - renderStart);

  return {
    run: async () => {
      if (command === 'start') {
        return await start(ctx);
      } else if (command === 'build') {
        return await build(ctx);
      }
    },
  };
}

export default createService;
