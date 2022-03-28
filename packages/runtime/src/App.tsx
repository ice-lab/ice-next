import React, { useEffect, useMemo, useState } from 'react';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import type Runtime from './runtime.js';
import { createRoutes, matchRoutes } from './routes.js';
import { createTransitionManager } from './transition.js';
import type { RouteItem, RouteModules } from './types.js';

interface Props {
  runtime: Runtime;
  action: Action;
  location: Location;
  navigator: Navigator;
  static?: boolean;
}

export default function App(props: Props) {
  const { runtime, location: historyLocation, action, navigator, static: staticProp = false } = props;
  const appContext = runtime.getAppContext();
  const { appConfig, routes: originRoutes, routeModules, pageData: initPageData } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  if (!originRoutes || originRoutes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  const [, setClientState] = useState({});

  const routes = useMemo(
    () => createRoutes(originRoutes, routeModules, PageWrappers),
    [originRoutes, routeModules, PageWrappers],
  );

  const loadModules = shouldLoadModules(routes, historyLocation, routeModules);

  const [transitionManager] = useState(() => {
    return createTransitionManager({
      routes,
      location: historyLocation,
      routeModules,
      onChange: (state) => {
        setClientState({ ...state });
      },
      pageData: initPageData,
    });
  });

  useEffect(() => {
    const state = transitionManager.getState();
    if (state.location === historyLocation || !loadModules) {
      return;
    }
    transitionManager.handleLoad(historyLocation);
  }, [transitionManager, historyLocation, loadModules]);

  // waiting for the location change in the transitionManager, the UI will rerender
  const { location, pageData } = transitionManager.getState();

  let element;
  if (routes.length === 1 && !routes[0].children) {
    // TODO: 去除 react-router-dom history 等依赖
    element = routes[0].element;
  } else {
    element = (
      <AppRouter
        action={action}
        location={loadModules ? location : historyLocation}
        navigator={navigator}
        static={staticProp}
        routes={routes}
      />
    );
  }
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider
          value={{
            ...appContext,
            pageData,
          }}
        >
          <AppProvider>
            {element}
          </AppProvider>
        </AppContextProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}

/**
 * whether or not execute `transitionManager.handleLoad` function
 */
function shouldLoadModules(routes: RouteItem[], location: Location, routeModules: RouteModules) {
  const matches = matchRoutes(routes, location);
  const loadedModules = matches.filter(match => {
    const { route: { id } } = match;
    return routeModules[id];
  });

  if (loadedModules.length !== matches.length) {
    // 1. the modules have not been loaded
    return true;
  }

  return matches.some((match) => {
    const { route: { id } } = match;
    const { getInitialData } = routeModules[id];
    // 2. if the page route has the getInitialData function, should load page data again
    return !!getInitialData;
  });
}