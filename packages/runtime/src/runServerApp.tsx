import * as Stream from 'stream';
import type * as StreamType from 'stream';
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
import type {
  AppContext, InitialContext, RouteItem, ServerContext,
  AppConfig, RuntimePlugin, CommonJsRuntime, AssetsManifest,
} from './types';

const { Writable } = Stream;

interface RenderOptions {
  appConfig: AppConfig;
  assetsManifest: AssetsManifest;
  routes: RouteItem[];
  runtimeModules: (RuntimePlugin | CommonJsRuntime)[];
  Document: React.ComponentType<React.PropsWithChildren<{}>>;
}

const isStream = true;

export async function renderToHTML(requestContext: ServerContext, options: RenderOptions) {
  const element = await createServerEntry(requestContext, options);

  if (isStream) {
    const pipe = await renderToNodeStream(element, false);
    const html = await piperToString(pipe);
    console.log(html);
    return html;
  }

  const result = await renderToString(element);
  return result.value;
}

export async function renderToResponse(requestContext: ServerContext, options: RenderOptions) {
  const { res } = requestContext;
  const element = await createServerEntry(requestContext, options);

  if (isStream) {
    const pipe = await renderToNodeStream(element, false);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    pipe(res, (error) => {
      throw error;
    });

    return;
  }

  const result = await renderToString(element);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(result.value);
}

function piperToString(input): Promise<string> {
  return new Promise((resolve, reject) => {
    const bufferedChunks: any[] = [];

    const stream = new Writable({
      writev(chunks, callback) {
        chunks.forEach((chunk) => bufferedChunks.push(chunk.chunk));
        callback();
      },
    });

    stream.on('finish', () => {
      const result = Buffer.concat(bufferedChunks).toString();
      resolve(result);
    });

    stream.on('error', (error) => {
      reject(error);
    });

    input(stream);
  });
}

async function renderToString(element) {
  const html = ReactDOMServer.renderToString(element);

  return {
    value: html,
    statusCode: 200,
  };
}

type NodeWritablePiper = (
  res: StreamType.Writable,
  next?: (err?: Error) => void
) => void;

function renderToNodeStream(
  element: React.ReactElement,
  generateStaticHTML: boolean,
): NodeWritablePiper {
  return (res, next) => {
    const { pipe } = ReactDOMServer.renderToPipeableStream(
      element,
      {
        onError(error: Error) {
          next(error);
        },
        onShellReady() {
          if (!generateStaticHTML) {
            pipe(res);
          }
        },
        onShellError(error: Error) {
          next(error);
        },
        // onAllReady() {
        //   pipe(res);
        // },
      },
    );
  };
}

function renderToReadableStream(
  element: React.ReactElement,
): NodeWritablePiper {
  return (res, next) => {
    const readable = (ReactDOMServer as any).renderToReadableStream(element, {
      onError: (error) => {
        throw error;
      },
    });

    const reader = readable.getReader();
    const decoder = new TextDecoder();
    const process = () => {
      reader.read().then(({ done, value }: any) => {
        if (done) {
          next();
        } else {
          const s = typeof value === 'string' ? value : decoder.decode(value);
          res.write(s);
          process();
        }
      });
    };

    process();
  };
}

/**
 * Render App by SSR.
 */
export async function createServerEntry(requestContext: ServerContext, options: RenderOptions): Promise<ReactElement> {
  const { req } = requestContext;

  const {
    assetsManifest,
    appConfig,
    runtimeModules,
    routes,
    Document,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    // TODO: Render 404
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

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
export async function createDocument(requestContext: ServerContext, options: RenderOptions): Promise<ReactElement> {
  const { req } = requestContext;

  const {
    routes,
    assetsManifest,
    appConfig,
    Document,
  } = options;

  const location = getLocation(req.url);
  const matches = matchRoutes(routes, location);

  if (!matches.length) {
    throw new Error('No matched page found.');
  }

  await loadRouteModules(matches.map(({ route: { id, load } }) => ({ id, load })));

  const routesConfig = getRoutesConfig(matches, {});
  // renderDocument needn't to load routesData and appData.
  const routesData = {};
  const appData = {};

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

  return (
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <Document />
      </AppDataProvider>
    </AppContextProvider>
  );
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