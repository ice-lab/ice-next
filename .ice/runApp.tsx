import { Runtime } from '@ice/runtime';
import loadStaticModules from './loadStaticModules';
import loadRuntimeModules from './loadRuntimeModules';
import { render } from './render';
import type { AppConfig } from './types';

export function runApp(config: AppConfig = {}) {
  const appConfig = {
    ...config,
    app: {
      rootId: 'root',
      ...(config?.app || {}),
    },
  };
  loadStaticModules(appConfig);
  // TODO generate buildConfig
  const buildConfig = {
    ssr: false,
  };
  // TODO create context
  const context = {};
  const runtime = new Runtime(appConfig, buildConfig, context);
  loadRuntimeModules(runtime);
  render(runtime);
}
