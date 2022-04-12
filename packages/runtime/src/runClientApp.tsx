import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import type { AppContext, AppConfig, RouteItem, AppRouterProps, PageWrapper, RuntimeModules, InitialContext } from './types';
import { loadRouteModules, loadPageData, getPageConfig, matchRoutes } from './routes.js';
import { loadStyleLinks, loadScripts } from './assets.js';
import { getLinks, getScripts } from './pageConfig.js';

interface RunClientAppOptions {
  appConfig: AppConfig;
  routes: RouteItem[];
  runtimeModules: RuntimeModules;
  Document: React.ComponentType<{}>;
}

export default async function runClientApp(options: RunClientAppOptions) {
  const {
    appConfig,
    routes,
    runtimeModules,
    Document,
  } = options;

  const matches = matchRoutes(routes, window.location);
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const appContextFromServer = (window as any).__ICE_APP_CONTEXT__ || {};

  let { initialData, pageData, pageConfig, assetsManifest } = appContextFromServer;

  const initialContext = getInitialContext();
  if (!initialData && appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  if (!pageData) {
    pageData = await loadPageData(matches, initialContext);
  }

  if (!pageConfig) {
    pageConfig = getPageConfig(matches, initialContext);
  }

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData,
    initialPageData: pageData,
    pageConfig,
    assetsManifest,
    matches,
  };

  // TODO: provide useAppContext for runtime modules
  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime, Document);
}

async function render(runtime: Runtime, Document: React.ComponentType<{}>) {
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
      Document={Document}
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
  Document: React.ComponentType<{}>;
}

function BrowserEntry({ history, appContext, Document, ...rest }: BrowserEntryProps) {
  const { routes, initialPageData, matches: originMatches, pageConfig: initialPageConfig } = appContext;

  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
    pageData: initialPageData,
    pageConfig: initialPageConfig,
    matches: originMatches,
  });

  const { action, location, pageData, pageConfig, matches } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      const matches = matchRoutes(routes, location);
      if (!matches) {
        throw new Error(`Routes not found in location ${location}.`);
      }

      loadNextPage(matches, (pageData, pageConfig) => {
        // just re-render once, so add pageData to historyState :(
        setHistoryState({ action, location, pageData, pageConfig, matches });
      });
    });
  }, []);

  // update app context for the current route.
  Object.assign(appContext, {
    matches,
    pageData,
    pageConfig,
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

/**
 * Prepare for the next pages.
 * Load modules、getPageData and preLoad the custom assets.
 */
async function loadNextPage(matches, callback) {
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const initialContext = getInitialContext();
  const pageData = await loadPageData(matches, initialContext);
  const pageConfig = getPageConfig(matches, pageData);

  const links = getLinks(matches, pageConfig);
  const scripts = getScripts(matches, pageConfig);

  await Promise.all([
    loadStyleLinks(links),
    loadScripts(scripts),
  ]);

  callback(pageData, pageConfig);
}

function getInitialContext() {
  const { href, origin, pathname, search } = window.location;
  const path = href.replace(origin, '');
  const query = Object.fromEntries(createSearchParams(search));
  const initialContext: InitialContext = {
    pathname,
    path,
    query,
  };

  return initialContext;
}