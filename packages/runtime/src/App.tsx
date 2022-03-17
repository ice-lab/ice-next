import React, { useEffect, useMemo, useState } from 'react';
import { matchRoutes as matchClientRoutes } from 'react-router-dom';
import type { Action, Location } from 'history';
import type { Navigator, RouteObject } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider, useAppContext } from './AppContext.js';
import type Runtime from './runtime.js';
import type { PageWrapper, RouteItem, RouteModules } from './types.js';
import RouteWrapper from './RouteWrapper.js';
import { loadRouteModule } from './routes.js';

interface Props {
  runtime: Runtime;
  action: Action;
  location: Location;
  navigator: Navigator;
}

export default function App(props: Props) {
  const { runtime, location, action, navigator } = props;
  const appContext = runtime.getAppContext();
  const { appConfig, routes, routeModules } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  if (!routes || routes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  const clientRoutes = useMemo(
    () => createClientRoutes(routes, routeModules, PageWrappers),
    [routes, PageWrappers, routeModules],
  );
  // TODO: update types
  // @ts-expect-error
  appContext.routes = clientRoutes;

  const [clientState, setClientState] = useState({});
  appContext.appState = clientState;

  let element;
  if (routes.length === 1 && !routes[0].children) {
    const PageComponent = routes[0].component;
    element = <PageComponent />;
  } else {
    element = (
      <AppRouter
        action={action}
        location={location}
        navigator={navigator}
        PageWrappers={PageWrappers}
      />
    );
  }

  const [transitionManager] = React.useState(() => {
    return createTransitionManager({
      routes: clientRoutes,
      location,
      routeModules,
      onChange: (state) => {
        setClientState({ ...state });
      },
    });
  });

  useEffect(() => {
    const state = transitionManager.getState();
    if (state.location === location) {
      return;
    }
    transitionManager.send({ location });
  }, [transitionManager, location]);
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider value={appContext}>
          <AppProvider>
            {element}
          </AppProvider>
        </AppContextProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}

function createTransitionManager(options: any) {
  const { routes, location, routeModules } = options;
  const state = {
    location,
    matchRoutes: undefined,
  };

  function update(updates: any) {
    options.onChange({ ...state, ...updates });
  }

  async function send({ location }) {
    let matchRoutes = matchClientRoutes(routes, location);

    if (!matchRoutes) {
      throw new Error('Routes not found.');
    }

    await Promise.all(matchRoutes.map(((matchRoute) => {
      return loadRouteModule(matchRoute.route as RouteItem, routeModules);
    })));
    update({ matchRoutes });
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

function createClientRoutes(routes: RouteItem[], routeModules: RouteModules, PageWrappers?: PageWrapper<any>[]) {
  return routes.map(({ path, component: PageComponent, children, index, componentName }: RouteItem) => {
    let element;
    if (PageComponent) {
      element = (
        <RouteWrapper PageComponent={PageComponent} PageWrappers={PageWrappers} />
      );
    } else {
      element = <RouteComponent componentName={componentName} />;
    }

    // } else if (load) {
    //   const LazyComponent = React.lazy(load);

    //   // TODO: Remove Suspense
    //   element = (
    //     <React.Suspense fallback={<>loading chunk....</>}>
    //       <RouteWrapper PageComponent={LazyComponent} PageWrappers={PageWrappers} />
    //     </React.Suspense>
    //   );
    // } else {
    //   element = 'Page Component is not found.';
    // }

    const route: RouteObject = {
      path,
      element,
      index,
    };

    if (children) {
      route.children = createClientRoutes(children, routeModules, PageWrappers);
    }

    return route;
  });
}

function DefaultRouteComponent({ componentName }: { componentName: string }): JSX.Element {
  throw new Error(
    `Route "${componentName}" has no component! Please go add a \`default\` export in the route module file.\n` +
      'If you were trying to navigate or submit to a resource route, use `<a>` instead of `<Link>` or `<Form reloadDocument>`.',
  );
}

function RouteComponent({ componentName }: { componentName: string }) {
  const { routeModules } = useAppContext();
  const { default: Component } = routeModules[componentName];
  const element = Component ? <Component /> : <DefaultRouteComponent componentName={componentName} />;
  return element;
}