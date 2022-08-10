import * as path from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
import type { Config, Plugin } from '@ice/types';

interface Options {
  disableResetPageState?: boolean;
}

const storeFilePattern = '**/store.{js,ts}';
const ignoreStoreFilePatterns = ['**/models/**', storeFilePattern];

const plugin: Plugin<Options> = (options = {}) => ({
  name: '@ice/plugin-hook-store',
  setup: ({ onGetConfig, modifyUserConfig, context: { rootDir, userConfig } }) => {
    // const { disableResetPageState = false } = options;
    const srcDir = path.join(rootDir, 'src');

    modifyUserConfig('routes', {
      ...(userConfig.routes || {}),
      ignoreFiles: [...(userConfig?.routes?.ignoreFiles || []), ...ignoreStoreFilePatterns],
    });

    onGetConfig(config => {
      // Add app store provider.
      const appStorePath = getAppStorePath(srcDir);
      if (appStorePath) {
        config.alias = {
          ...config.alias || {},
          $store: appStorePath,
        };
      }
      // config.transformPlugins = [
      //   ...(config.transformPlugins || []),
      //   exportStoreProviderPlugin({ pageDir, disableResetPageState }),
      // ];
      return config;
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

function getAppStorePath(srcPath: string) {
  const result = fg.sync(storeFilePattern, { cwd: srcPath, deep: 1 });
  return result.length ? path.join(srcPath, result[0]) : undefined;
}

export default plugin;
