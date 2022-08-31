import * as path from 'path';
import type { RouteObject } from 'react-router';
import formatPath from './formatPath.js';

/**
 * get all route path
 * @param routes
 * @returns
 */
function getRoutePaths(routes: RouteObject[], parentPath = ''): string[] {
  let pathList = [];

  routes.forEach(route => {
    if (route.children) {
      pathList = pathList.concat(getRoutePaths(route.children, route.path));
    } else {
      pathList.push(formatPath(path.join('/', parentPath, route.path || '')));
    }
  });

  return pathList;
}

export default getRoutePaths;
