import type { AppConfig } from './types';

const defaultAppConfig: AppConfig = {
  app: {
    rootId: 'root',
    strict: true,
  },
  router: {
    type: 'browser',
  },
};

export default defaultAppConfig;
