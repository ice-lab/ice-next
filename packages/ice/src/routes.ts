import * as path from 'path';
import { formatNestedRouteManifest, generateRouteManifest } from '@ice/route-manifest';
import type { NestedRouteManifest } from '@ice/route-manifest';

export function generateRoutesRenderData(rootDir: string) {
  const routeManifest = generateRouteManifest(rootDir);
  const routes = formatNestedRouteManifest(routeManifest);
  const routesStr = generateRoutesStr(routes);

  return { routesStr };
}

function generateRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  const str = generateNestRoutesStr(nestRouteManifest);
  return `[${str}]`;
}

function generateNestRoutesStr(nestRouteManifest: NestedRouteManifest[]) {
  return nestRouteManifest.reduce((prev, route) => {
    const { children, path: routePath, index, componentName, file, id } = route;

    const fileExtname = path.extname(file);
    const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');

    let str = `{
      path: '${routePath || ''}',
      load: () => import(/* webpackChunkName: "${componentName}" */ '@/${componentFile}'),
      componentName: '${componentName}',
      index: ${index},
      id: '${id}',
      exact: true,
    `;
    if (children) {
      str += `children: [${generateNestRoutesStr(children)}],`;
    }
    str += '},';
    prev += str;
    return prev;
  }, '');
}