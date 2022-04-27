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

  return {
    routeManifest,
    routesStr: `[${str}]`,
    routes,
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
    id: '_404',
    file: path.join(rootDir, '.ice', '_404'),
    componentName: '_404',
    path: '*',
    parentId: routeManifest['layout'] ? 'layout' : null,
  };
}