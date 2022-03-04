
import * as React from 'react';
import type { ComponentType } from 'react';
import * as ReactDOMServer from 'react-dom/server.js';

export default async function render(context, runtime) {
  const AppProvider = runtime.composeAppProvider();
  const AppComponent = runtime.getAppComponent();

  const AppWrapper = () => {
    return AppProvider ? (
      <AppProvider>
        { AppComponent }
      </AppProvider>
    ) : AppComponent;
  };

  const appContext = runtime.context;
  const Document: ComponentType = appContext.document;

  const documentHtml = ReactDOMServer.renderToString(<Document />);

  const pageHtml = ReactDOMServer.renderToString(<AppWrapper />);

  const html = documentHtml.replace('<div id="root"></div>', pageHtml);

  return html;
}