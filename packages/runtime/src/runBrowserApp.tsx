import React, { useRef, useLayoutEffect, useReducer } from 'react';
import type { HashHistory, BrowserHistory, Update } from 'history';
import { createHashHistory, createBrowserHistory } from 'history';
import { matchRoutes } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, InitialContext, AppConfig, RouteItem } from './types';
import { loadRouteModule } from './routes.js';
import { getCurrentPageData, loadPageData } from './transition.js';

export default async function runBrowserApp(
  appConfig: AppConfig,
  runtimeModules,
  routes,
) {
  const matches = matchRoutes(routes, window.location);
  const routeModules = {};
  await Promise.all(matches.map(match => loadRouteModule(match.route as RouteItem, routeModules)));
  const pageDataResults = await loadPageData({ matches, location: window.location, routeModules });
  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    routeModules,
    pageData: getCurrentPageData(pageDataResults),
  };
  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    appContext.initialData = (window as any).__ICE_APP_DATA__;
    // context.pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else if (appConfig?.app?.getInitialData) {
    const { href, origin, pathname, search } = window.location;
    const path = href.replace(origin, '');
    // const query = queryString.parse(search);
    const query = {};
    const ssrError = (window as any).__ICE_SSR_ERROR__;
    const initialContext: InitialContext = {
      pathname,
      path,
      query,
      ssrError,
    };
    appContext.initialData = await appConfig.app.getInitialData(initialContext);
  }

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
  const appMountNode = document.getElementById(rootId);

  render(
    <BrowserComponent
      runtime={runtime}
      routerType={routerType}
    />,
    appMountNode,
  );
}

function BrowserComponent({ runtime, routerType }: { runtime: Runtime; routerType: AppConfig['router']['type'] }) {
  const historyRef = useRef<HashHistory | BrowserHistory>();
  if (!historyRef.current) {
    historyRef.current = (routerType === 'hash' ? createHashHistory : createBrowserHistory)({ window });
  }
  const history = historyRef.current;
  const [state, dispatch] = useReducer(
    (_: Update, update: Update) => update,
    {
      action: history.action,
      location: history.location,
    },
  );

  useLayoutEffect(() => history.listen(dispatch), [history]);

  const { action, location } = state;
  return (
    <App
      runtime={runtime}
      action={action}
      location={location}
      navigator={history}
    />
  );
}