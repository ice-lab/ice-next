import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { loadRouteModules, loadPageData, loadPageConfig, matchRoutes } from './routes.js';
import type { AppContext, InitialContext, RouteItem, ServerContext, AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest } from './types';

interface RunServerAppOptions {
  requestContext: ServerContext;
  appConfig: AppConfig;
  routes: RouteItem[];
  isSSR: boolean;
  isSSG: boolean;
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  assetsManifest: AssetsManifest;
  Document: React.ComponentType<{}>;
}

export default async function runServerApp(requestContext, options: RunServerAppOptions): Promise<string> {
  const { req } = requestContext;

  // ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
  const locationProps = parsePath(req.url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  const { Document, runtimeModules, ...appContext } = options;
  const { routes, isSSG, isSSR } = appContext;

  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    // TODO: Render 404
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  Object.assign(appContext, {
    matches,
  });

  let html;

  if (!isSSR && !isSSG) {
    html = await renderDocument(Document, matches, appContext);
    return html;
  }

  try {
    html = await renderServerApp(Document, matches, appContext, runtimeModules, requestContext, location);
  } catch (error) {
    console.error(error);
    // Downgrade to CSR.
    html = await renderDocument(Document, matches, appContext);
  }

  return html;
}

/**
 * Render App by SSR.
 */
async function renderServerApp(Document, matches, appContext, runtimeModules, requestContext, location) {
  const { req } = requestContext;
  const { url } = req;

  const initialContext: InitialContext = {
    ...requestContext,
    pathname: location.pathname,
    query: Object.fromEntries(createSearchParams(location.search)),
    path: url,
  };

  const { appConfig } = appContext;

  let initialData;
  if (appConfig.app?.getInitialData) {
    initialData = await appConfig.app.getInitialData(initialContext);
  }

  const pageData = await loadPageData(matches, initialContext);

  const context: AppContext = {
    ...appContext,
    initialData,
    initialPageData: pageData,
    // pageData and initialPageData are the same when SSR/SSG
    pageData,
  };

  const runtime = new Runtime(context);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  const staticNavigator = createStaticNavigator();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  const result = ReactDOMServer.renderToString(
    <AppContextProvider value={context}>
      <Document>
        <App
          action={Action.Pop}
          location={location}
          navigator={staticNavigator}
          static
          AppProvider={AppProvider}
          PageWrappers={PageWrappers}
          AppRouter={AppRouter}
        />
      </Document>
    </AppContextProvider>,
  );

  return result;
}

/**
 * Render Document for CSR.
 */
async function renderDocument(Document, matches, appContext) {
  const pageConfig = await loadPageConfig(matches);
  const pageData = {
    pageConfig,
  };

  const context: AppContext = {
    ...appContext,
    pageData,
  };

  const result = ReactDOMServer.renderToString(
    <AppContextProvider value={context}>
      <Document />
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