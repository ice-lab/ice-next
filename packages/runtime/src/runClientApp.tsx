import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import type { HashHistory, BrowserHistory } from 'history';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, AppConfig, RouteItem, AppRouterProps, PageWrapper, RuntimeModules } from './types';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import getInitialContext from './getInitialContext.js';
import { getPageAssets, getEntryAssets } from './assets.js';
import { DocumentContextProvider } from './document.js';

export default async function runClientApp(
  appConfig: AppConfig,
  runtimeModules: RuntimeModules,
  routes: RouteItem[],
  Document,
) {
  const matches = matchRoutes(routes, window.location);
  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));
  const initialContext = getInitialContext();

  let appData = (window as any).__ICE_APP_DATA__ || {};
  let { initialData } = appData;
  if (!initialData && appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  let pageData = (window as any).__ICE_PAGE_DATA__ || {};
  if (!pageData) {
    pageData = await loadPageData(matches, initialContext);
  }

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData,
    initialPageData: pageData,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime, Document, initialData, matches);
}

async function render(runtime: Runtime, Document, initialData, matches) {
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
      matches={matches}
      initialData={initialData}
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
  Document: any;
  matches: any;
  initialData: any;
}

function BrowserEntry({ history, appContext, initialData, matches: oMatches, Document, ...rest }: BrowserEntryProps) {
  const { routes, initialPageData } = appContext;
  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
    pageData: initialPageData,
    matches: oMatches,
  });
  const { action, location, pageData, matches } = historyState;

  const [showApp, setShowApp] = useState(true);

  // 如果是 CSR, 首次需要先不渲染 App，避免节点不一致
  // useEffect(() => {
  //   setShowApp(true);
  // }, []);

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

  const element = (
    <App
      action={action}
      location={location}
      navigator={history}
      appContext={{
        ...appContext,
        pageData,
      }}
      {...rest}
    />
  );

  const assetsManifest = (window as any).__ICE_ASSETS_MANIFEST__ || {};

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const documentContext = {
    appData: {
      initialData,
    },
    pageData,
    pageAssets,
    entryAssets,
    appElement: showApp ? element : null,
    assetsManifest,
  };

  return (
    <DocumentContextProvider value={documentContext}>
      <Document />
    </DocumentContextProvider>
  );
}