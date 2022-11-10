import type { History } from 'history';
import { createMiniAppHistory } from 'miniapp-history';

let routerHistory: History;

interface IRoute {
  path: string;
  source: string;
}

function generateRoutes(routes: Array<string>): Array<IRoute> {
  return routes.map(route => {
    const removedSlashRoute = route.replace(/^\//, ''); // Remove / at the beginning of the route
    return {
      path: removedSlashRoute === 'index' ? '/' : `/${removedSlashRoute}`.replace(/\/index$/, ''),
      source: `pages/${removedSlashRoute}`,
    };
  });
}

function setHistory(routes: Array<string>) {
  routerHistory = createMiniAppHistory(generateRoutes(routes));
}

export {
  routerHistory,
  setHistory,
};
