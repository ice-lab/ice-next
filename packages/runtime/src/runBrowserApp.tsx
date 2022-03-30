import React, { useLayoutEffect, useState } from 'react';
import { createHashHistory, createBrowserHistory } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, AppConfig, RouteItem, InitialContext, AppRouterProps, PageWrapper } from './types';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';

export default async function runBrowserApp(
  appConfig: AppConfig,
  runtimeModules,
  routes,
) {
  const matches = matchRoutes(routes, window.location);
  const routeModules = await loadRouteModules(matches.map(match => match.route as RouteItem));

  const { href, origin, pathname, search } = window.location;
  const path = href.replace(origin, '');
  const query = Object.fromEntries(createSearchParams(search));
  const initialContext: InitialContext = {
    pathname,
    path,
    query,
  };

  let appData = (window as any).__ICE_APP_DATA__ || {};
  let { initialData } = appData;
  if (!initialData && appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  let pageData = (window as any).__ICE_PAGE_DATA__ || {};
  if (!pageData) {
    pageData = await loadPageData(matches, routeModules, initialContext);
  }

  const appContext: AppContext = {
    routes,
    routeModules,
    appConfig,
    initialData,
    initialPageData: pageData,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime);
}

async function render(runtime: Runtime) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { app: { rootId }, router: { type: routerType } } = appConfig;
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();
  const appMountNode = document.getElementById(rootId);

  render(
    <BrowserEntry
      routerType={routerType}
      appContext={appContext}
      AppProvider={AppProvider}
      PageWrappers={PageWrappers}
      AppRouter={AppRouter}
    />,
    appMountNode,
  );
}

interface Props {
  routerType: AppConfig['router']['type'];
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  PageWrappers: PageWrapper<{}>[];
  AppRouter: React.ComponentType<AppRouterProps>;
}

function BrowserEntry({
  routerType, appContext, ...rest
}: Props) {
  const history = (routerType === 'hash' ? createHashHistory : createBrowserHistory)({ window });
  const { routes, initialPageData } = appContext;
  const [historyState, setHistoryState] = useState({
    action: history.action,
    location: history.location,
  });
  const [pageData, setPageData] = useState(initialPageData);
  const { action, location } = historyState;

  // listen the history change and update the state which including the latest action and location
  useLayoutEffect(() => {
    history.listen(({ action, location }) => {
      const matches = matchRoutes(routes, location);
      if (!matches) {
        throw new Error(`Routes not found in location ${location}.`);
      }

      loadRouteModules(matches.map(match => match.route as RouteItem))
        .then((routeModules) => {
          return loadPageData(matches, routeModules, {});
        })
        .then((pageData) => {
          setPageData(pageData);
          setHistoryState({ action, location });
        });
    });
  }, [history, routes]);

  return (
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
}