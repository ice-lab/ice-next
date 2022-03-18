import React, { useEffect, useMemo, useState } from 'react';
import type { Action, Location } from 'history';
import type { Navigator } from 'react-router-dom';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import type Runtime from './runtime.js';
import { createClientRoutes } from './routes.js';
import { createTransitionManager } from './transition.js';

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
