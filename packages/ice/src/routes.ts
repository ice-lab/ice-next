import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, ConfigRoute, RouteManifest } from '@ice/route-manifest';
import type { UserConfig } from '@ice/types';
import { getRouteExports } from './service/analyze.js';

export async function generateRoutesInfo(rootDir: string, routesConfig: UserConfig['routes'] = {}) {
  const routeManifest = generateRouteManifest(rootDir, routesConfig.ignoreFiles, routesConfig.defineRoutes);

  const analyzeTasks = Object.keys(routeManifest).map(async (key) => {
    const routeItem = routeManifest[key];
    const routeId = routeItem.id;
    // add exports filed for route manifest
    routeItem.exports = await getRouteExports({
      rootDir,
      routeConfig: {
        file: path.join('./src/pages', routeItem.file),
        routeId,
      },
    });
  });
  await Promise.all(analyzeTasks);

  if (!routeManifest['$']) {
    // create default 404 page
    const defaultNotFoundRoute = createDefaultNotFoundRoute(rootDir, routeManifest);
    routeManifest['$'] = defaultNotFoundRoute;
  }

  const routes = formatNestedRouteManifest(routeManifest);
  const str = generateNestRoutesStr(routes);
  let routesCount = 0;
  Object.keys(routeManifest).forEach((key) => {
    const routeItem = routeManifest[key];
    if (!routeItem.layout) {
      routesCount += 1;
    }
  });

  return {
    routesCount,
    routeManifest,
    routesStr: `[${str}]`,
    routes,
    loaders: generateLoadersStr(routes),
  };
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file, id, layout, exports } = route;

    const componentPath = path.isAbsolute(file) ? file : `@/pages/${file}`.replace(new RegExp(`${path.extname(file)}$`), '');
    let str = `{
      path: '${routePath || ''}',
      load: () => import(/* webpackChunkName: "${componentName}" */ '${componentPath}'),
      componentName: '${componentName}',
      index: ${index},
      id: '${id}',
      exact: true,
      exports: ${JSON.stringify(exports)},
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

function createDefaultNotFoundRoute(rootDir: string, routeManifest: RouteManifest): ConfigRoute {
  return {
    path: '*',
    id: 'ice/default/404',
    parentId: routeManifest['layout'] ? 'layout' : null,
    file: path.join(rootDir, '.ice', '404.tsx'),
    componentName: 'ice-default-404',
    layout: false,
  };
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
      const componentPath = path.isAbsolute(componentFile) ? componentFile : `@/pages/${componentFile}`;

      const loaderName = `getData_${id}`.replace('/', '_');
      loaders.push([id, loaderName]);
      let str = `import { getData as ${loaderName} } from '${componentPath}';\n`;

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