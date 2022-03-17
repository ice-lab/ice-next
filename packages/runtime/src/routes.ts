import type { RouteItem, RouteModules } from './types';

export async function loadRouteModule(route: RouteItem, routeModulesCache: RouteModules) {
  const { id, load } = route;
  if (id in routeModulesCache) {
    return routeModulesCache[id];
  }

  try {
    const routeModule = await load();
    routeModulesCache[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.log('error===>', error);
    // window.location.reload();
  }
}