import { matchRoutes as matchClientRoutes } from 'react-router-dom';
import { loadRouteModule } from './routes.js';
import type { RouteItem } from './types';

export function createTransitionManager(options: any) {
  const { routes, location, routeModules } = options;
  let state = {
    location,
    matchRoutes: undefined,
    transition: {
      state: 'idle',
    },
  };

  function update(updates: any) {
    state = { ...state, ...updates };
    options.onChange(state);
  }

  async function send({ location }) {
    let matchRoutes = matchClientRoutes(routes, location);

    if (!matchRoutes) {
      throw new Error('Routes not found.');
    }

    await Promise.all(matchRoutes.map(((matchRoute) => {
      return loadRouteModule(matchRoute.route as RouteItem, routeModules);
    })));
    update({ matchRoutes, location });
  }

  function getState() {
    return state;
  }

  return {
    update,
    send,
    getState,
  };
}
