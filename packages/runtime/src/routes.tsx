import React from 'react';
import RouteWrapper from './RouteWrapper.js';
import type { RouteItem, RouteModules, PageWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { PageContextProvider } from './PageContext.js';

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
    console.error(error);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}

export function createClientRoutes(routes: RouteItem[], routeModules: RouteModules, PageWrappers?: PageWrapper<any>[]) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, element, ...rest } = routeItem;
    const idParts = id.split('/');
    const isLayout = idParts[idParts.length - 1] === 'layout';
    // Layout components don't need to wrap the Provider(for example: AuthProvider)
    element = isLayout ? (
      <RouteComponent id={id} />
    ) : (
      <RouteWrapper
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
      route.children = createClientRoutes(children, routeModules, PageWrappers);
    }

    return route;
  });
}

function DefaultRouteComponent({ id }: { id: string }): JSX.Element {
  throw new Error(
    `Route "${id}" has no component! Please go add a \`default\` export in the route module file.\n` +
      'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
  );
}

function RouteComponent({ id, ...props }: { id: string }) {
  const { routeModules, pageData } = useAppContext();
  const { default: Component } = routeModules[id];
  const element = Component ? <Component {...props} /> : <DefaultRouteComponent id={id} />;
  return (
    <PageContextProvider value={{ ...pageData[id] }}>
      {element}
    </PageContextProvider>
  );
}