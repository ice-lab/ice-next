import type { ServerResponse } from 'http';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Action, parsePath } from 'history';
import type { Location } from 'history';
import { createSearchParams } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider } from './AppData.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import { piperToString, renderToNodeStream } from './server/streamRender.js';
import { createStaticNavigator } from './server/navigator.js';
import type { NodeWritablePiper } from './server/streamRender.js';
import type {
  AppContext, InitialContext, RouteItem, ServerContext,
  AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest,
  ComponentWithChildren,
} from './types';

interface RenderOptions {
  appConfig: AppConfig;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: ComponentWithChildren<{}>;
  documentOnly?: boolean;
}

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}
interface RenderResult {
  statusCode?: number;
  value?: string | Piper;
}

/**
 * Render and return the result as html string.
 */
export async function renderToHTML(requestContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const result = await doRender(requestContext, options);

  const { value } = result;

  if (typeof value === 'string') {
    return result;
  }

  const { pipe, fallback } = value;

  try {
    const html = await piperToString(pipe);

    return {
      value: html,
      statusCode: 200,
    };
  } catch (error) {
    console.error('PiperToString Error:', error);
    // downgrade to csr.
    const result = fallback();
    return result;
  }
}

/**
 * Render and send the result to ServerResponse.
 */
export async function renderToResponse(requestContext: ServerContext, options: RenderOptions) {
  const { res } = requestContext;
  const result = await doRender(requestContext, options);

  const { value } = result;

  if (typeof value === 'string') {
    sendResult(res, result);
  } else {
    const { pipe, fallback } = value;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    try {
      await piperToResponse(res, pipe);
    } catch (error) {
      console.error('PiperToResponse Error:', error);
      // downgrade to csr.
      const result = await fallback();
      sendResult(res, result);
    }
  }
}

/**
 * Send string result to ServerResponse.
 */
async function sendResult(res: ServerResponse, result: RenderResult) {
  res.statusCode = result.statusCode;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(result.value);
}

/**
 * Send stream result to ServerResponse.
 */
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
    console.error('Render Server Entry Error', err);
    return renderDocument(matches, options);
  }
}

// TODO: render custom 404 page. https://github.com/ice-lab/ice-next/issues/133
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

  const pipe = await renderToNodeStream(element, false);

  const fallback = () => {
    renderDocument(matches, options);
  };

  return {
    value: {
      pipe,
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