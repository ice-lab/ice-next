// Based on https://github.com/remix-run/remix/blob/main/packages/remix-react/transition.ts
import type { Location } from 'history';
import { matchRoutes as matchClientRoutes } from 'react-router-dom';
import { loadRouteModule } from './routes.js';
import type { RouteItem, RouteModules } from './types';

interface TransitionState {
  location: Location | string;
}
interface TransitionOptions {
  routes: RouteItem[];
  location: Location | string;
  routeModules: RouteModules;
  onChange: (state: TransitionState) => void;
}
export function createTransitionManager(options: TransitionOptions) {
  const { routes, location, routeModules } = options;
  let state = {
    location,
  };

  function update(updates: TransitionState) {
    state = { ...state, ...updates };
    options.onChange(state);
  }

  function getState() {
    return state;
  }

  async function handleLoad(location: Location | string) {
    const matchRoutes = matchClientRoutes(routes, location);
    if (!matchRoutes) {
      throw new Error('Routes not found.');
    }
    await Promise.all(matchRoutes.map(((matchRoute) => {
      return loadRouteModule(matchRoute.route as RouteItem, routeModules);
    })));
    update({ location });
  }

  return {
    update,
    handleLoad,
    getState,
  };
}
