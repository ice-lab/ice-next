import { runtimeEnvironment } from '../constant.js';

type AppConfig = Record<string, any>;

export const defineRuntimeEnv = () => {
  Object.keys(runtimeEnvironment).forEach((key) => {
    process.env[`ICE_RUNTIME_${key}`] = runtimeEnvironment[key];
  });
};

export const updateRuntimeEnv = (appConfig: AppConfig) => {
  // TODO modify specific environment
  if (!appConfig?.app?.getInitialData) {
    process.env['ICE_RUNTIME_INITIAL_DATA'] = 'false';
  }
};
