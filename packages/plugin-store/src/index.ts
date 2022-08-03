import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';
import fse from 'fs-extra';

interface Options {
  disableResetPageState?: true;
}

const plugin: Plugin<Options> = () => ({
  name: '@ice/plugin-store',
  setup: ({ onGetConfig, context: { rootDir } }) => {
    const srcDir = path.join(rootDir, 'src');
    onGetConfig(config => {
      // Add app store provider.
      const appStorePath = getAppStorePath(srcDir);
      if (appStorePath) {
        config.alias = {
          ...config.alias || {},
          $store: appStorePath,
        };
      }

      return config;
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

function getAppStorePath(srcPath: string) {
  const storeFileType = ['.js', '.ts'].find((fileType) => fse.pathExistsSync(path.join(srcPath, `store${fileType}`))) || '';
  // e.g: src/store.[j|t]s
  return storeFileType ? path.join(srcPath, `store${storeFileType}`) : '';
}

export default plugin;
