import type { RouteItem, RouteModules } from './types';

export async function loadRouteModule(route: RouteItem, routeModulesCache: RouteModules) {
  const { componentName, load } = route;
  if (componentName in routeModulesCache) {
    return routeModulesCache[componentName];
  }

  try {
    // TODO: should get the chunkName from webpack stats manifest
    const routeModule = await load();
    routeModulesCache[componentName] = routeModule;
    return routeModule;
  } catch (error) {
    window.location.reload();
  }
}