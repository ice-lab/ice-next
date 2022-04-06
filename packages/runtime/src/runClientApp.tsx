import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import type { AppContext, AppConfig, RouteItem, AppRouterProps, PageWrapper, RuntimeModules } from './types';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import getInitialContext from './getInitialContext.js';

export default async function runClientApp(
  appConfig: AppConfig,
  runtimeModules: RuntimeModules,
  routes: RouteItem[],
  documentComponent: React.ComponentType<any>,
) {
  const matches = matchRoutes(routes, window.location);
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const appContextFromServer = (window as any).__ICE_APP_CONTEXT__ || {};

  let { isSSR, isSSG, initialData, pageData, assetsManifest } = appContextFromServer;

  const initialContext = getInitialContext();
  if (!initialData && appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  if (!pageData) {
    pageData = await loadPageData(matches, initialContext);
  }

  const appContext: AppContext = {
    isSSR,
    isSSG,
    routes,
    appConfig,
    initialData,
    initialPageData: pageData,
    assetsManifest,
    matches,
    documentComponent,
  };

  // TODO: provide useAppContext for runtime modules
  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime);
}

async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { router: { type: routerType } } = appConfig;
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  const history = (routerType === 'hash' ? createHashHistory : createBrowserHistory)({ window });

  render(
    <BrowserEntry
      history={history}
      appContext={appContext}
      AppProvider={AppProvider}
      PageWrappers={PageWrappers}
      AppRouter={AppRouter}
    />,
    document,
  );
}

interface BrowserEntryProps {
  history: HashHistory | BrowserHistory;
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  PageWrappers: PageWrapper<{}>[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

function BrowserEntry({ history, appContext, ...rest }: BrowserEntryProps) {
  const { routes, initialPageData, matches: originMatches, documentComponent: Document } = appContext;

  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
    pageData: initialPageData,
    matches: originMatches,
  });

  const { action, location, pageData, matches } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      const matches = matchRoutes(routes, location);
      if (!matches) {
        throw new Error(`Routes not found in location ${location}.`);
      }

      loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })))
        .then(() => {
          const initialContext = getInitialContext();
          return loadPageData(matches, initialContext);
        })
        .then(async (pageData) => {
          // await updatePageConfig(pageData.pageConfig);
          // just re-render once, so add pageData to historyState :(
          setHistoryState({ action, location, pageData, matches });
        });
    });
  }, []);

  // update app content for the current route.
  Object.assign(appContext, {
    matches,
    pageData,
  });

  return (
    <AppContextProvider value={appContext}>
      <Document>
        <App
          action={action}
          location={location}
          navigator={history}
          {...rest}
        />
      </Document>
    </AppContextProvider>
  );
}