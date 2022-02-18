import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type RuntimeService from './runtimeService';

export interface AppLifeCycle {
  initAppLifeCycles: () => void;
  emitLifeCycles: () => void;
}

export function getRenderApp(runtime: RuntimeService) {
  const appConfig = runtime.getAppConfig();
  const { strict = false } = appConfig.app;
  const AppProvider = runtime.composeAppProvider();
  const AppComponent = runtime.getAppComponent();

  function App() {
    let rootApp = <AppComponent />;
    if (AppProvider) {
      rootApp = (
        <AppProvider>
          {rootApp}
        </AppProvider>
      );
    }
    if (strict) {
      rootApp = (
        <React.StrictMode>
          {rootApp}
        </React.StrictMode>
      );
    }
    return rootApp;
  }
  return App;
}

function getAppMountNode(runtime: RuntimeService) {
  const appConfig = runtime.getAppConfig();
  const { rootId } = appConfig.app;
  return document.getElementById(rootId) || document.getElementById('ice-container');
}

export async function render(runtime: RuntimeService, appLifecycle: AppLifeCycle) {
  const { initAppLifeCycles, emitLifeCycles } = appLifecycle;
  const App = getRenderApp(runtime);
  const appMountNode = getAppMountNode(runtime);
  // init app life cycles after app runtime created
  initAppLifeCycles();
  // emit app launch cycle
  emitLifeCycles();
  if (runtime?.modifyDOMRender) {
    runtime?.modifyDOMRender?.({ App, appMountNode });
  } else {
    ReactDOM.render(<App />, appMountNode);
  }
}