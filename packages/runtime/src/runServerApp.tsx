import type { ServerResponse } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, createPath, parsePath } from 'history';
import type { Location, To } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider } from './AppData.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import { piperToString, renderToNodeStream } from './server/streamRender.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import type {
  AppContext, InitialContext, RouteItem, ServerContext,
  AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest,
} from './types';

interface RenderOptions {
  appConfig: AppConfig;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: React.ComponentType<React.PropsWithChildren<{}>>;
  documentOnly?: boolean;
}

interface Piper {
  piper: NodeWritablePiper;
  fallback: Function;
}
interface RenderResult {
  statusCode?: number;
  value?: string | Piper;
}

export async function renderToHTML(requestContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const result = await doRender(requestContext, options);

  const { value } = result;

  if (typeof value === 'string') {
    return result;
  }

  const { piper, fallback } = value;

  try {
    const html = await piperToString(piper);

    return {
      value: html,
      statusCode: 200,
    };
  } catch (error) {
    const result = fallback();
    return result;
  }
}

export async function renderToResponse(requestContext: ServerContext, options: RenderOptions) {
  const { res } = requestContext;
  const result = await doRender(requestContext, options);

  const { value } = result;

  if (typeof value === 'string') {
    sendResult(res, result);
    return;
  }

  const { piper, fallback } = value;

  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    await piperToResponse(res, piper);
  } catch (error) {
    const result = await fallback();
    sendResult(res, result);
  }
}

async function sendResult(res: ServerResponse, result: RenderResult) {
  res.statusCode = result.statusCode;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(result.value);
}

function piperToResponse(res, pipe: NodeWritablePiper) {
  return new Promise((resolve, reject) => {
    pipe(res, (err) => (err ? reject(err) : resolve(null)));
  });
}

async function doRender(requestContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const { req } = requestContext;

  const {
    routes,
    documentOnly,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    return render404();
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  if (documentOnly) {
    return renderDocument(matches, options);
  }

  try {
    return await renderServerEntry(requestContext, options, matches, location);
  } catch (err) {
    return renderDocument(matches, options);
  }
}

// TODO: render custom 404 page.
function render404(): RenderResult {
  return {
    value: 'Page is Not Found',
    statusCode: 404,
  };
}

/**
 * Render App by SSR.
 */
export async function renderServerEntry(
  requestContext: ServerContext, options: RenderOptions, matches, location,
  ): Promise<RenderResult> {
  const { req } = requestContext;

  const {
    assetsManifest,
    appConfig,
    runtimeModules,
    routes,
    Document,
  } = options;

  const initialContext: InitialContext = {
    ...requestContext,
    pathname: location.pathname,
    query: Object.fromEntries(createSearchParams(location.search)),
    path: req.url,
  };

  let appData;
  if (appConfig.app?.getData) {
    appData = await appConfig.app.getData(initialContext);
  }

  const routesData = await loadRoutesData(matches, initialContext);
  const routesConfig = getRoutesConfig(matches, routesData);

  const appContext: AppContext = {
    appConfig,
    assetsManifest,
    appData,
    routesData,
    routesConfig,
    matches,
    routes,
  };

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  const staticNavigator = createStaticNavigator();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  const element = (
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
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
      </AppDataProvider>
    </AppContextProvider>
  );

  const piper = await renderToNodeStream(element, false);

  const fallback = () => {
    renderDocument(matches, options);
  };

  return {
    value: {
      piper,
      fallback,
    },
  };
}

/**
 * Render Document for CSR.
 */
export function renderDocument(matches, options: RenderOptions): RenderResult {
  const {
    routes,
    assetsManifest,
    appConfig,
    Document,
  } = options;

  // renderDocument needn't to load routesData and appData.
  const appData = {};
  const routesData = {};
  const routesConfig = getRoutesConfig(matches, {});

  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    appData,
    routesData,
    routesConfig,
    matches,
    routes,
    documentOnly: true,
  };

  const html = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <Document />
      </AppDataProvider>
    </AppContextProvider>,
  );

  return {
    value: html,
    statusCode: 200,
  };
}

/**
 * ref: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/server.tsx
 */
function getLocation(url: string) {
  const locationProps = parsePath(url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

  return location;
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