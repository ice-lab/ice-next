import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, matchRoutes } from 'react-router-dom';
import { merge } from 'lodash-es';
import defaultAppConfig from './defaultAppConfig.js';
import Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps, AppContext, InitialContext, AppConfig } from './types';

export default async function runBrowserApp(config: AppConfig, runtimeModules, routes) {
  const appConfig: AppConfig = merge(defaultAppConfig, config);

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
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
  const { appConfig, routes } = appContext;
  const { rootId } = appConfig.app;

  // TODO: set ssr by process env
  const isSSR = true;
  const render = isSSR ? ReactDOM.hydrate : runtime.getRender();

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
    AppRouter = (props: AppRouterProps) => (
      <Router>
        <AppRoutes PageWrappers={props.PageWrappers} />
      </Router>
    );
    runtime.setAppRouter(AppRouter);
  }

  const matchedRoutes = matchRoutes(routes, window.location);
  await loadRouteChunks(matchedRoutes);

  const appMountNode = getAppMountNode(rootId);

  // default ReactDOM.render
  render((
    <App
      runtime={runtime}
    />
  ), appMountNode);
}

function getAppMountNode(rootId: string): HTMLElement {
  return rootId ? document.getElementById(rootId) : document.getElementById('ice-container');
}

async function loadRouteChunks(matchedRoutes) {
  for (let i = 0, n = matchedRoutes.length; i < n; i++) {
    const { route } = matchedRoutes[i];
    route.component = (await route.load()).default;
  }
}