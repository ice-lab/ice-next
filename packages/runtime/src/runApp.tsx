import Runtime from './runtime.js';
import render from './render.js';
import type { AppContext, AppConfig, RuntimeModules } from './types.js';
import getInitialData from './getInitialData.js';

export default async function runApp(config: AppConfig, runtimeModules: RuntimeModules, routes: AppContext['routes']) {
  const appConfig: AppConfig = {
    ...config,
    app: {
      rootId: 'root',
      strict: true,
      ...(config?.app || {}),
    },
    router: {
      type: 'hash',
      ...(config?.router || {}),
    },
  };

  const appContext: AppContext = {
    routes,
    appConfig,
    initialData: null,
  };
  console.log('process.env.ICE_RUNTIME_INITIAL_DATA1', process.env.ICE_RUNTIME_INITIAL_DATA);
  if (process.env.ICE_RUNTIME_INITIAL_DATA) {
    console.log('process.env.ICE_RUNTIME_INITIAL_DATA', process.env.ICE_RUNTIME_INITIAL_DATA);
    appContext.initialData = getInitialData(appConfig);
  }

  const runtime = new Runtime(appContext);
  runtimeModules.forEach(m => {
    runtime.loadModule(m);
  });

  render(runtime);
}