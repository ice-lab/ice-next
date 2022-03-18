import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { merge } from 'lodash-es';
import defaultAppConfig from './defaultAppConfig.js';
import Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';
import type { AppContext, AppConfig, RouteItem, RouteModules } from './types';
import { loadRouteModule } from './routes.js';

export default async function runServerApp(
    requestContext,
    config: AppConfig,
    runtimeModules,
    routes: RouteItem[],
    Document,
    documentOnly: boolean,
  ) {
  const appConfig: AppConfig = merge(defaultAppConfig, config);

  const routeModules = {};
  await createRouteModules(routes, routeModules);

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    document: Document,
    routeModules,
  };

  if (appConfig?.app?.getInitialData) {
    appContext.initialData = await appConfig.app.getInitialData(requestContext);
  }

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  return render(runtime, requestContext, Document, documentOnly);
}

async function render(
  runtime: Runtime,
  requestContext,
  Document,
  documentOnly: boolean,
) {
  const documentHtml = ReactDOMServer.renderToString(<Document />);

  if (documentOnly) {
    return documentHtml;
  }
  const { req } = requestContext;
  const locationProps = parsePath(req.url);

  const location: Location = {
    pathname: locationProps.pathname || '/',
    search: locationProps.search || '',
    hash: locationProps.hash || '',
    state: null,
    key: 'default',
  };

 let staticNavigator = {
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

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    runtime.setAppRouter(DefaultAppRouter);
  }

  const pageHtml = ReactDOMServer.renderToString(
    <App
      action={Action.Pop}
      runtime={runtime}
      location={location}
      navigator={staticNavigator}
      static
    />,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}

async function createRouteModules(routes: RouteItem[], routeModules: RouteModules) {
  for (const route of routes) {
    await loadRouteModule(route, routeModules);
    if (route.children) {
      await createRouteModules(route.children, routeModules);
    }
  }
}
