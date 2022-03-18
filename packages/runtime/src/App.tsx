import React, { useEffect, useMemo, useState } from 'react';
import { matchRoutes as matchClientRoutes } from 'react-router-dom';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider, useAppContext } from './AppContext.js';
import type Runtime from './runtime.js';
import type { PageWrapper, RouteItem, RouteModules } from './types.js';
import RouteWrapper from './RouteWrapper.js';
import { loadRouteModule } from './routes.js';

interface Props {
  runtime: Runtime;
  action: Action;
  location: Location | string;
  navigator: Navigator;
  static?: boolean;
}

export default function App(props: Props) {
  const { runtime, location: historyLocation, action, navigator, static: staticProp = false } = props;
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
    [routes, routeModules, PageWrappers],
  );

  const [transitionManager] = React.useState(() => {
    return createTransitionManager({
      routes: clientRoutes,
      location: historyLocation,
      routeModules,
      onChange: (state) => {
        setClientState({ ...state });
      },
    });
  });

  // waiting for the location change in the transitionManager, the UI will rerender
  const { location } = transitionManager.getState();

  useEffect(() => {
    const state = transitionManager.getState();
    if (state.location === historyLocation) {
      return;
    }
    transitionManager.send({ location: historyLocation });
  }, [transitionManager, historyLocation]);

  const [, setClientState] = useState({});

  let element;
  if (routes.length === 1 && !routes[0].children) {
    const PageComponent = routes[0].element;
    element = <PageComponent />;
  } else {
    element = (
      <AppRouter
        action={action}
        location={location}
        navigator={navigator}
        static={staticProp}
      />
    );
  }
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider value={{ ...appContext, routes: clientRoutes }}>
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

function createClientRoutes(routes: RouteItem[], routeModules: RouteModules, PageWrappers?: PageWrapper<any>[]) {
  return routes.map((routeItem: RouteItem) => {
    let { path, children, index, id, ...rest } = routeItem;
    delete rest.element;

    const element = (
      <RouteWrapper
        PageComponent={(...props) => <RouteComponent id={id} {...props} />}
        PageWrappers={PageWrappers}
      />
    );
    // TODO: update types
    const route: any = {
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
  const { routeModules } = useAppContext();
  const { default: Component } = routeModules[id];
  return Component ? <Component {...props} /> : <DefaultRouteComponent id={id} />;
}