import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import type { Location, To } from 'history';
import { Action, createPath, parsePath } from 'history';
import { matchRoutes } from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import type { AppContext, AppConfig, RouteItem, RouteModules } from './types';
import { loadRouteModule } from './routes.js';
import { getCurrentPageData, loadPageData } from './transition.js';

export default async function runServerApp(
  requestContext,
  appConfig: AppConfig,
  runtimeModules,
  routes: RouteItem[],
  Document,
  documentOnly: boolean,
): Promise<string> {
  const routeModules = {};
  await createRouteModules(routes, routeModules);
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
  const matches = matchRoutes(routes, location);
  const pageDataResults = await loadPageData({ matches, location, routeModules });
  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    document: Document,
    routeModules,
    pageData: getCurrentPageData(pageDataResults),
  };

  if (appConfig?.app?.getInitialData) {
    appContext.initialData = await appConfig.app.getInitialData(requestContext);
  }

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  return render(runtime, location, Document, documentOnly);
}

async function render(
  runtime: Runtime,
  location: Location,
  Document,
  documentOnly: boolean,
) {
  const documentHtml = ReactDOMServer.renderToString(<Document />);

  if (documentOnly) {
    return documentHtml;
  }

 const staticNavigator = createStaticNavigator();

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