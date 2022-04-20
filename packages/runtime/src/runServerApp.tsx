import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { createSearchParams } from 'react-router-dom';
import type { ReactElement } from 'react';
import Runtime from './runtime.js';
import App from './App.js';
import { AppContextProvider } from './AppContext.js';
import { AppDataProvider } from './AppData.js';
import { loadRouteModules, loadRoutesData, getRoutesConfig, matchRoutes } from './routes.js';
import { piperToString, renderToNodeStream, renderToReadableStream } from './server/streamRender.js';
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

interface RenderResult {
  pipe?: NodeWritablePiper;
  statusCode?: number;
  html?: string;
}

export async function renderToHTML(requestContext: ServerContext, options: RenderOptions) {
  const result = await doRender(requestContext, options);
  const { pipe } = result;

  if (pipe) {
    const html = await piperToString(pipe);
    return {
      html,
      statusCode: 200,
    };
  }

  return result;
}

export async function renderToResponse(requestContext: ServerContext, options: RenderOptions) {
  const { res } = requestContext;

  try {
    const result = await doRender(requestContext, options);
    const { pipe } = result;

    if (!pipe) {
      sendResult(res, result);
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    pipe(res, async (err) => {
      if (err) {
        options.documentOnly = true;
        const result = await doRender(requestContext, options);
        sendResult(res, result);
      }
    });
  } catch (error) {
    const result = render500(error);
    sendResult(res, result);
  }
}

async function sendResult(res, result: RenderResult) {
  res.statusCode = result.statusCode;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(result.html);
}

function piperToResponse(pipe, res) {
  return new Promise((resolve, reject) => {
    pipe(res, (err) => (err ? reject(err) : resolve(null)));
  });
}

async function doRender(requestContext: ServerContext, options: RenderOptions): Promise<RenderResult> {
  const { req } = requestContext;

  const {
    routes,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    return render404();
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const { documentOnly } = options;

  if (documentOnly) {
    return renderDocument(matches, options);
  }

  let element;

  try {
    element = await createServerEntry(requestContext, matches, options);
  } catch (err) {
    console.error('Downgrade To CSR:', err);
    return renderDocument(matches, options);
  }

  // @ts-expect-error
  const pipe = process.browser
        ? await renderToReadableStream(element)
        : await renderToNodeStream(element, false);

  return {
    pipe,
  };
}

function render404() {
  return {
    html: 'Page is Not Found',
    statusCode: 404,
  };
}

function render500(error) {
  console.error(error);

  return {
    html: 'internal server error',
    statusCode: 500,
  };
}

/**
 * Render App by SSR.
 */
export async function createServerEntry(
  requestContext: ServerContext, matches, options: RenderOptions,
  ): Promise<ReactElement> {
  const { req } = requestContext;

  const {
    assetsManifest,
    appConfig,
    runtimeModules,
    routes,
    Document,
  } = options;

  const location = getLocation(req.url);

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

  return (
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
}

/**
 * Render Document for CSR.
 */
export async function renderDocument(matches, options: RenderOptions): Promise<RenderResult> {
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
    html,
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