import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import { getWebpackConfig, getTransformPlugins as getBuiltInPlugins } from '@builder/webpack-config';

function getTaskConfig(context: Context<Config>) {
  const { getConfig, rootDir } = context;
  const taskConfig = getConfig();
  if (!taskConfig.length) {
    throw new Error('Task config is not Found');
  }
  const configs = taskConfig.map(({ config, name }) => {
    const webpackConfig = getWebpackConfig({ rootDir, config });
    const getTransformPlugins = (customConfig?: Partial<Config>) => {
      return getBuiltInPlugins(rootDir, {
        ...config,
        ...(customConfig || {}),
      });
    };
    return {
      name,
      config,
      webpackConfig,
      getTransformPlugins,
    };
  });
  return configs;
}

export default getTaskConfig;