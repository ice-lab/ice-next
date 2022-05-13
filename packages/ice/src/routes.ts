import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest } from '@ice/route-manifest';
import type { UserConfig } from '@ice/types';

export function generateRoutesInfo(rootDir: string, routesConfig: UserConfig['routes'] = {}) {
  const routeManifest = generateRouteManifest(rootDir, routesConfig.ignoreFiles, routesConfig.defineRoutes);
  const routes = formatNestedRouteManifest(routeManifest);
  const str = generateNestRoutesStr(routes);
  const strForServer = generateNestRoutesStrForServer(routes);

  return {
    routeManifest,
    routesStr: `[${str}]`,
    routes,
    loaders: generateLoadersStr(routes),
    imports: generateImportStr(routeManifest),
    routesStrForServer: `[${strForServer}]`,
  };
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file, id, layout } = route;

    const fileExtname = path.extname(file);
    const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');

    let str = `{
      path: '${routePath || ''}',
      load: () => import(/* webpackChunkName: "${componentName}" */ '@/pages/${componentFile}'),
      componentName: '${componentName}',
      index: ${index},
      id: '${id}',
      exact: true,
      ${layout ? 'layout: true,' : ''}
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}

function generateImportStr(manifest) {
  const routes: any = Object.values(manifest);

  const imports = routes.map(route => {
    const { componentName, file } = route;

    const fileExtname = path.extname(file);
    const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
    const moduleName = componentName.replaceAll('/-/g', '_');

    // All route entry points are virtual modules that will be loaded by the routeModulePlugin.
    // This allows us to tree-shake code (i.e. getConfig & getData).
    return `import * as ${moduleName} from '@/pages/${componentFile}?server';`;
  });

  return imports.join('\n');
}

function generateNestRoutesStrForServer(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, id, layout } = route;

    const moduleName = componentName.replace('/-/g', '_');

    let str = `{
      path: '${routePath || ''}',
      load: () => ${moduleName},
      componentName: '${componentName}',
      index: ${index},
      id: '${id}',
      exact: true,
      ${layout ? 'layout: true,' : ''}
    `;
    if (children) {
      str += `children: [${generateNestRoutesStrForServer(children)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}

/**
 * generate loader template for routes
 */
function generateLoadersStr(routes: NestedRouteManifest[]) {
  const loaders = [];

  function importLoaders(routes) {
    return routes.reduce((prev, route) => {
      const { children, file, id } = route;

      const fileExtname = path.extname(file);
      const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');

      const loaderName = `getData_${id}`.replace('/', '_');
      loaders.push([id, loaderName]);

      let str = `import { getData as ${loaderName} } from '@/pages/${componentFile}';\n`;

      if (children) {
        str += importLoaders(children);
      }

      prev += str;

      return prev;
    }, '');
  }

  let str = importLoaders(routes);

  str = `${str}
  const loaders = {
    ${
      loaders.map((loader) => {
        return `'${loader[0]}': ${loader[1]},`;
      }).join('\n')
    }
  };`;

  return str;
}