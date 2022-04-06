import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { loadRouteModules, loadPageData, matchRoutes } from './routes.js';
import type { AppContext, InitialContext, RouteItem, ServerContext, AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest } from './types';

interface RunServerAppOptions {
  requestContext: ServerContext;
  appConfig: AppConfig;
  routes: RouteItem[];
  documentComponent: React.ComponentType<{}>;
  isSSR: boolean;
  isSSG: boolean;
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  assetsManifest: AssetsManifest;
}

async function runServerApp(options: RunServerAppOptions): Promise<string> {
  const {
    appConfig,
    assetsManifest,
    documentComponent,
    isSSR,
    isSSG,
    requestContext,
    runtimeModules,
    routes,
  } = options;

  const { req } = requestContext;
  const { url } = req;

  // ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
  const locationProps = parsePath(url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  const matches = matchRoutes(routes, location);

  // TODO: error handling
  if (!matches.length) {
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const initialContext: InitialContext = {
    ...requestContext,
    pathname: location.pathname,
    query: Object.fromEntries(createSearchParams(location.search)),
    path: url,
  };

  let initialData;
  if (appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  const pageData = await loadPageData(matches, initialContext);

  const appContext: AppContext = {
    matches,
    routes,
    appConfig,
    initialData,
    initialPageData: pageData,
    // pageData and initialPageData are the same when SSR/SSG
    pageData,
    assetsManifest,
    isSSR,
    isSSG,
    documentComponent,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  const html = render(runtime, location);
  return html;
}

export default runServerApp;

async function render(
  runtime: Runtime,
  location: Location,
) {
  const appContext = runtime.getAppContext();
  const { documentComponent: Document, isSSR, isSSG } = appContext;

  let app = null;

  const documentOnly = !isSSR && !isSSG;

  if (!documentOnly) {
    const staticNavigator = createStaticNavigator();
    const AppProvider = runtime.composeAppProvider() || React.Fragment;
    const PageWrappers = runtime.getWrapperPageRegistration();
    const AppRouter = runtime.getAppRouter();

    app = (
      <App
        action={Action.Pop}
        location={location}
        navigator={staticNavigator}
        static
        AppProvider={AppProvider}
        PageWrappers={PageWrappers}
        AppRouter={AppRouter}
      />
    );
  }

  const result = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <Document>
        {app}
      </Document>
    </AppContextProvider>,
  );

  return result;
}

function createStaticNavigator() {
  return {
    createHref(to: To) {
      return typeof to === 'string' ? to : createPath(to);
    },
    push(to: To) {
      throw new Error(
        'You cannot use navigator.push() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${JSON.stringify(to)})\` somewhere in your app.`,
      );
    },
    replace(to: To) {
      throw new Error(
        'You cannot use navigator.replace() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere ` +
          'in your app.',
      );
    },
    go(delta: number) {
      throw new Error(
        'You cannot use navigator.go() on the server because it is a stateless ' +
          'environment. This error was probably triggered when you did a ' +
          `\`navigate(${delta})\` somewhere in your app.`,
      );
    },
    back() {
      throw new Error(
        'You cannot use navigator.back() on the server because it is a stateless ' +
          'environment.',
      );
    },
    forward() {
      throw new Error(
        'You cannot use navigator.forward() on the server because it is a stateless ' +
          'environment.',
      );
    },
    block() {
      throw new Error(
        'You cannot use navigator.block() on the server because it is a stateless ' +
          'environment.',
      );
    },
  };
}