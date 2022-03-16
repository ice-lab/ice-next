import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppContext, AppConfig, AppRouterProps } from './types';

export default async function runServerApp(
    requestContext,
    config: AppConfig,
    runtimeModules,
    routes,
    Document,
    documentOnly: boolean,
  ) {
  const appConfig: AppConfig = {
    ...config,
    app: {
      rootId: 'root',
      strict: true,
      ...(config?.app || {}),
    },
    router: {
      type: 'browser',
      ...(config?.router || {}),
    },
  };

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
    document: Document,
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

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const { req } = requestContext;
    AppRouter = (props: AppRouterProps) => (
      <StaticRouter location={req.url}>
        <AppRoutes PageWrappers={props.PageWrappers} />
      </StaticRouter>
    );
    runtime.setAppRouter(AppRouter);
  }

  const pageHtml = ReactDOMServer.renderToString(
    <App
      runtime={runtime}
    />,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}
