import React, { useRef, useLayoutEffect, useReducer } from 'react';
import * as ReactDOM from 'react-dom';
import type { HashHistory, BrowserHistory, Update } from 'history';
import { createHashHistory, createBrowserHistory } from 'history';
import { matchRoutes as matchClientRoutes } from 'react-router-dom';
import { merge } from 'lodash-es';
import defaultAppConfig from './defaultAppConfig.js';
import Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';
import type { AppContext, InitialContext, AppConfig, RouteItem } from './types';
import { loadRouteModule } from './routes.js';

export default async function runBrowserApp(config: AppConfig, runtimeModules, routes) {
  const appConfig: AppConfig = merge(defaultAppConfig, config);

  const matchRoutes = matchClientRoutes(routes, window.location);
  const routeModules = {};
  await Promise.all(matchRoutes.map(match => loadRouteModule(match.route as RouteItem, routeModules)));

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    routeModules,
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

  // TODO: set ssr by process env
  const isSSR = true;
  const render = isSSR ? ReactDOM.hydrate : runtime.getRender();

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    AppRouter = DefaultAppRouter;
    runtime.setAppRouter(AppRouter);
  }

  const appMountNode = getAppMountNode(rootId);

  render(
    <BrowserComponent
      runtime={runtime}
      routerType={routerType}
    />,
    appMountNode,
  );
}

function getAppMountNode(rootId: string): HTMLElement {
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
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