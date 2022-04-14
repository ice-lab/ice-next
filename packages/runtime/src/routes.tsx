import React from 'react';
import type { Location } from 'history';
import type { RouteObject } from 'react-router-dom';
import { matchRoutes as originMatchRoutes } from 'react-router-dom';
import PageWrapper from './PageWrapper.js';
import type { RouteItem, RouteModules, PageWrapper as IPageWrapper, RouteMatch, InitialContext, PageConfig } from './types';

// global route modules cache
const routeModules: RouteModules = {};

type RouteModule = Pick<RouteItem, 'id' | 'load'>;

export async function loadRouteModule(route: RouteModule) {
  const { id, load } = route;
  if (id in routeModules) {
    return routeModules[id];
  }

  try {
    const routeModule = await load();
    routeModules[id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(error);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}

export async function loadRouteModules(routes: RouteModule[]) {
  for (const route of routes) {
    await loadRouteModule(route);
  }
  return routeModules;
}

/**
* get data for the matched routes.
*/
export async function loadPageData(matches: RouteMatch[], initialContext: InitialContext) {
  const pageData = {};

  await Promise.all(
    matches.map(async (match) => {
      const { id } = match.route;
      const routeModule = routeModules[id];
      const { getData } = routeModule;

      if (getData) {
        const initialData = await getData(initialContext);
        pageData[id] = initialData;
      }
    }),
  );

  return pageData;
}

/**
 * Get page config for matched routes.
 */
export function getPageConfig(matches: RouteMatch[], pageData): PageConfig {
  const pageConfig = {};

  matches.forEach(async (match) => {
    const { id } = match.route;
    const routeModule = routeModules[id];
    const { getConfig } = routeModule;
    const data = pageData[id];

    if (getConfig) {
      const value = getConfig({ data });
      pageConfig[id] = value;
    }
  });

  return pageConfig;
}

/**
 * Create elements in routes which will be consumed by react-router-dom
 */
export function createRouteElements(routes: RouteItem[], PageWrappers?: IPageWrapper<any>[]) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, element, ...rest } = routeItem;
    const idParts = id.split('/');
    const isLayout = idParts[idParts.length - 1] === 'layout';
    // Layout components don't need to wrap the Provider(for example: AuthProvider)
    element = isLayout ? (
      <RouteComponent id={id} />
    ) : (
      <PageWrapper
        PageComponent={(...props) => <RouteComponent id={id} {...props} />}
        PageWrappers={PageWrappers}
      />
    );
    const route: RouteItem = {
      path,
      element,
      index,
      id,
      ...rest,
    };
    if (children) {
      route.children = createRouteElements(children, PageWrappers);
    }

    return route;
  });
}

function RouteComponent({ id, ...props }: { id: string }) {
  // get current route component from latest routeModules
  const { default: Component } = routeModules[id];
  if (process.env.NODE_ENV === 'development') {
    if (!Component) {
      throw new Error(
        `Route "${id}" has no component! Please go add a \`default\` export in the route module file.\n` +
          'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
      );
    }
  }
  return <Component {...props} />;
}

export function matchRoutes(
  routes: RouteItem[],
  location: Partial<Location> | string,
  basename?: string,
): RouteMatch[] {
  let matches = originMatchRoutes(routes as unknown as RouteObject[], location, basename);
  if (!matches) return [];

  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route: route as unknown as RouteItem,
    pathnameBase,
  }));
}

/**
 * filter matches is new or path changed.
 */
export function filterMatchesToLoad(matches, newMatches) {
  let isNew = (match: RouteMatch, index: number) => {
    // [a] -> [a, b]
    if (!matches[index]) return true;

    // [a, b] -> [a, c]
    return match.route.id !== matches[index].route.id;
  };

  let matchPathChanged = (match: RouteMatch, index: number) => {
    return (
      // param change, /users/123 -> /users/456
      matches[index].pathname !== match.pathname ||
      // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      (matches[index].route.path?.endsWith('*') &&
      matches[index].params['*'] !== match.params['*'])
    );
  };

  return newMatches.filter((match, index) => {
    return isNew(match, index) || matchPathChanged(match, index);
  });
}