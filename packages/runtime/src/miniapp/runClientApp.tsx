import React from 'react';

import Runtime from '../runtime.js';
import { AppContextProvider } from '../AppContext.js';
import { AppDataProvider, getAppData } from '../AppData.js';
import type {
  AppContext, AppExport, RouteItem, AppRouterProps, RoutesData, RoutesConfig,
  RouteWrapperConfig, RuntimeModules, RouteMatch, RouteModules, AppConfig, DocumentComponent,
} from '../types.js';

import getAppConfig from '../appConfig.js';
import App from './App.js';
import { createMiniApp } from './connect.js';

interface RunClientAppOptions {
  app: AppExport;
  runtimeModules: RuntimeModules;
}

export default async function runClientApp(options: RunClientAppOptions) {
  /* TODO:
    * 1. requestContext 获取，从 miniapp-runtime 的 Current.router 搞定
    */
  const { app } = options;
  const appData = await getAppData(app);
  console.log('🚀 ~ file: runClientApp.tsx ~ line 31 ~ runClientApp ~ appData', appData);
  const appConfig = getAppConfig(app);
  /* TODO:
  * 3. routeData 怎么拿？（依赖 dynamic import）
  * 4. routeConfig 怎么拿？（依赖 dynamic import）
  */
  // TODO:处理 types
  // @ts-ignore
  const appContext: AppContext = {
    appExport: app,
    appConfig,
    appData,
    // routesData,
    // routesConfig,
  };
  const runtime = new Runtime(appContext);
  /* TODO:
  * 5. runtimeModules 是啥
  */
  render(runtime);
  createMiniApp({
    pages: ['pages/index'],
  });
}

async function render(
  runtime: Runtime,
) {
  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const render = runtime.getRender();
  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const RouteWrappers = runtime.getWrappers();

  // TODO:支持设置 rootId (在 miniapp-runtime 中修改)
  render(
    document.getElementById(appConfig.app.rootId || 'app'),
    <BrowserEntry
      appContext={appContext}
      AppProvider={AppProvider}
      RouteWrappers={RouteWrappers}
    />,
  );
}

interface BrowserEntryProps {
  appContext: AppContext;
  AppProvider: React.ComponentType<any>;
  RouteWrappers: RouteWrapperConfig[];
}

function BrowserEntry({
  appContext,
  ...rest
}: BrowserEntryProps) {
  const {
    appData,
  } = appContext;

  return (
    <AppContextProvider value={appContext}>
      <AppDataProvider value={appData}>
        <App
          {...rest}
        />
      </AppDataProvider>
    </AppContextProvider>
  );
}
