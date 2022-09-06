import { defineConfig } from 'vitest/config';
import type { UserConfigExport, ConfigEnv, UserConfig } from 'vitest/config';
import getTaskConfig from './getTaskConfig.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';

const { merge } = lodash;

export default function defineVitestConfig(userConfig: UserConfigExport): UserConfigExport {
  return defineConfig(async (env: ConfigEnv) => {
    let customConfig: UserConfig;
    if (typeof userConfig === 'function') {
      customConfig = await userConfig(env);
    } else {
      customConfig = await userConfig;
    }

    const defaultConfig = await getDefaultConfig();

    return merge(defaultConfig, customConfig);
  })
}

async function getDefaultConfig() {
  const taskConfig = await getTaskConfig();
  const { config: { alias = {} } } = taskConfig;
  return {
    resolve: {
      alias,
    },
  }
}
