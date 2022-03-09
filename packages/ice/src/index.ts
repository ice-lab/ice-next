import * as path from 'path';
import { fileURLToPath } from 'url';
import { Context } from 'build-scripts';
import consola from 'consola';
import { generateRouteManifest, formatNestedRouteManifest } from '@ice/route-manifest';
import Generator from './service/runtimeGenerator.js';
import preCompile from './service/preCompile.js';
import createWatch from './service/watchSource.js';
import start from './commands/start.js';
import build from './commands/build.js';
import type { CommandArgs, CommandName, IGetBuiltInPlugins } from 'build-scripts';
import type { ExportData } from '@ice/types/esm/generator.js';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import type { RouteManifest, NestedRouteManifest } from '@ice/route-manifest';

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

  const { addWatchEvent, removeWatchEvent } = createWatch(path.join(rootDir, 'src'), command);
  const tmpDirName = '.ice';
  const routeManifest = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifest);

  // TODO: watch and generate routeManifest
  // const routes: Routes = [{
  //   path: '/*',
  //   filepath: path.join(rootDir, 'src/pages/home'),
  //   chunkName: 'home',
  //   componentName: 'Home',
  // }];
  const componentsImportStr = generateComponentsImportStr(routeManifest);
  const routesStr = generateRoutesStr(routes);

  const generator = new Generator({
    rootDir,
    targetDir: tmpDirName,
    // TODO get default Data
    defaultRenderData: {
      componentsImportStr,
      routesStr,
    },
  });

  // add default template of ice
  const templatePath = path.join(__dirname, '../template/');
  generator.addTemplateFiles(templatePath);

  addWatchEvent([
    path.join(rootDir, 'src'),
    (eventName: string, filePath: string) => {
      const routeManifest = generateRouteManifest(rootDir);
      const routes = formatNestedRouteManifest(routeManifest);
      consola.log('routes: ', routes);
      generator.renderFile(
        path.join(templatePath, 'routes.ts.ejs'),
        path.join(rootDir, tmpDirName, 'routes.ts'),
        { routesStr, componentsImportStr },
      );
    },
  ]);
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
    extendsPluginAPI: {
      generator: generatorAPI,
      watch: {
        addEvent: addWatchEvent,
        removeEvent: removeWatchEvent,
      },
      context: {
        routes,
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

function createComponentName(id: string) {
  return id.split('/')
    .map((item: string) => item[0].toUpperCase() + item.slice(1, item.length))
    .join('');
}

function generateComponentsImportStr(routeManifest: RouteManifest) {
  return Object.keys(routeManifest)
    .reduce((prev: string, id: string) => {
      const componentName = createComponentName(id);
      let { file } = routeManifest[id];
      const fileExtname = path.extname(file);
      file = file.replace(new RegExp(`${fileExtname}$`), '');
      return `${prev}const ${componentName} = React.lazy(() => import(/* webpackChunkName: "${componentName}" */ '@/${file}'))\n`;
  }, '');
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  const str = generateNestRoutesStr(nestRouteManifest);
  return `[${str}]`;
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path, id } = route;
    let str = `{
      path: '${path}',
      component: ${createComponentName(id)},
      exact: true,
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children)}],`;
    }
    str += '}';
    prev += str;
    return prev;
  }, '');
}

export default createService;
