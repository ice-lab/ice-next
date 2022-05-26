import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest, ConfigRoute, RouteManifest } from '@ice/route-manifest';
import type { UserConfig } from '@ice/types';

export function generateRoutesInfo(rootDir: string, routesConfig: UserConfig['routes'] = {}) {
  const routeManifest = generateRouteManifest(rootDir, routesConfig.ignoreFiles, routesConfig.defineRoutes);
  if (!routeManifest['$']) {
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
    const { children, path: routePath, index, componentName, file, id, layout } = route;

    const fileExtname = path.extname(file);
    const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');
    const componentPath = path.isAbsolute(componentFile) ? componentFile : `@/pages/${componentFile}`;
    let str = `{
      path: '${routePath || ''}',
      load: () => import(/* webpackChunkName: "${componentName}" */ '${componentPath}'),
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

function createDefaultNotFoundRoute(rootDir: string, routeManifest: RouteManifest): ConfigRoute {
  return {
    path: '*',
    id: '_404',
    parentId: routeManifest['layout'] ? 'layout' : null,
    file: path.join(rootDir, '.ice', '_404.tsx'),
    componentName: '_404',
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