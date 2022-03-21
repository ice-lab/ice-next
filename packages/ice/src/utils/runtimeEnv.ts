import type { RouteManifest } from '@ice/route-manifest';
import { runtimeEnvironment } from '../constant.js';

type AppConfig = Record<string, any>;

export const defineRuntimeEnv = () => {
  Object.keys(runtimeEnvironment).forEach((key) => {
    process.env[`ICE_RUNTIME_${key}`] = runtimeEnvironment[key];
  });
};

export const updateRuntimeEnv = (appConfig?: AppConfig, routeManifest?: RouteManifest) => {
  if (!appConfig?.app?.getInitialData) {
    process.env['ICE_RUNTIME_INITIAL_DATA'] = 'false';
  }
  if (!appConfig?.app?.errorBoundary) {
    process.env['ICE_RUNTIME_ERROR_BOUNDARY'] = 'false';
  }
  if (routeManifest && Object.keys(routeManifest).length <= 1) {
    process.env['ICE_RUNTIME_ROUTER'] = 'false';
  }
};
