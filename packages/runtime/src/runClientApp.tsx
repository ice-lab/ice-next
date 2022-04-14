import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory, Action, Location } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import type { AppContext, AppConfig, RouteItem, AppRouterProps, PageWrapper, RuntimeModules, InitialContext, RouteMatch, PagesData, PagesConfig } from './types';
import { loadRouteModules, loadPagesData, getPagesConfig, matchRoutes } from './routes.js';
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

  const appContextFromServer: AppContext = (window as any).__ICE_APP_CONTEXT__ || {};

  let { appData, pagesData, pagesConfig, assetsManifest } = appContextFromServer;

  const initialContext = getInitialContext();
  if (!appData && appConfig.app?.getData) {
    appData = await appConfig.app.getData(initialContext);
  }

  if (!pagesData) {
    pagesData = await loadPagesData(matches, initialContext);
  }

  if (!pagesConfig) {
    pagesConfig = getPagesConfig(matches, pagesData);
  }

  const appContext: AppContext = {
    routes,
    appConfig,
    appData,
    pagesData,
    pagesConfig,
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

interface HistoryState {
  action: Action;
  location: Location;
  pagesData: PagesData;
  pagesConfig: PagesConfig;
  matches: RouteMatch[];
}

function BrowserEntry({ history, appContext, Document, ...rest }: BrowserEntryProps) {
  const { routes, matches: originMatches, pagesData: initialPagesData, pagesConfig: initialPagesConfig } = appContext;

  const [historyState, setHistoryState] = useState<HistoryState>({
    action: history.action,
    location: history.location,
    pagesData: initialPagesData,
    pagesConfig: initialPagesConfig,
    matches: originMatches,
  });

  const { action, location, pagesData, pagesConfig, matches } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      const currentMatches = matchRoutes(routes, location);
      if (!currentMatches) {
        throw new Error(`Routes not found in location ${location}.`);
      }

      loadNextPage(currentMatches, historyState).then(({ pagesData, pagesConfig }) => {
        setHistoryState({
          action,
          location,
          pagesData,
          pagesConfig,
          matches: currentMatches,
        });
      });
    });
  }, []);

  // update app context for the current route.
  Object.assign(appContext, {
    matches,
    pagesData,
    pagesConfig,
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
async function loadNextPage(currentMatches: RouteMatch[], prevHistoryState: HistoryState) {
  const {
    matches: preMatches,
    pagesData: prePagesData,
  } = prevHistoryState;

  await loadRouteModules(currentMatches.map(({ route: { id, load } }) => ({ id, load })));

  // load data for changed route.
  const initialContext = getInitialContext();
  const matchesToLoad = filterMatchesToLoad(preMatches, currentMatches);
  const data = await loadPagesData(matchesToLoad, initialContext);

  const pagesData: PagesData = {};
  // merge page data.
  currentMatches.forEach(({ route }) => {
    const { id } = route;
    pagesData[id] = data[id] || prePagesData[id];
  });

  const pagesConfig = getPagesConfig(currentMatches, pagesData);

  const links = getLinks(currentMatches, pagesConfig);
  const scripts = getScripts(currentMatches, pagesConfig);

  await Promise.all([
    loadStyleLinks(links),
    loadScripts(scripts),
  ]);

  return {
    pagesData,
    pagesConfig,
  };
}

function filterMatchesToLoad(prevMatches: RouteMatch[], currentMatches: RouteMatch[]) {
  let isNew = (match: RouteMatch, index: number) => {
    // [a] -> [a, b]
    if (!prevMatches[index]) return true;

    // [a, b] -> [a, c]
    return match.route.id !== prevMatches[index].route.id;
  };

  let matchPathChanged = (match: RouteMatch, index: number) => {
    return (
      // param change, /users/123 -> /users/456
      prevMatches[index].pathname !== match.pathname ||
      // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      (prevMatches[index].route.path?.endsWith('*') &&
      prevMatches[index].params['*'] !== match.params['*'])
    );
  };

  return currentMatches.filter((match, index) => {
    return isNew(match, index) || matchPathChanged(match, index);
  });
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