import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';
import fse from 'fs-extra';
import { init, parse } from 'es-module-lexer';

interface Options {
  disableResetPageState?: true;
}

const plugin: Plugin<Options> = () => ({
  name: '@ice/plugin-store',
  setup: ({ onGetConfig, modifyUserConfig, context: { rootDir, userConfig } }) => {
    const srcDir = path.join(rootDir, 'src');
    const pageDir = path.join(srcDir, 'pages');

    modifyUserConfig('routes', {
      ...(userConfig.routes || {}),
      ignoreFiles: [...(userConfig?.routes?.ignoreFiles || []), '**/models/**', '**/store.{js,ts}'],
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
      config.transformPlugins = [
        ...(config.transformPlugins || []),
        exportStoreProviderPlugin({ pageDir }),
      ];
      return config;
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

function exportStoreProviderPlugin({ pageDir }: { pageDir: string }) {
  return {
    name: 'export-store-provider',
    enforce: 'post',
    transform: async (source: string, id: string) => {
      // TODO: filter the route component path
      if (id.startsWith(pageDir) && id.endsWith('.tsx')) {
        await init;
        const [imports] = parse(source);
        for (let index = 0; index < imports.length; index++) {
          const {
            n: specifier,
          } = imports[index];
          // TODO: page store
          if (specifier === './store' && !source.includes('Provider')) {
            // TODO: get the pageStore name
            source += `\n
const { Provider } = pageStore;
export { Provider };`;
            return source;
          }
        }
      }
      return source;
    },
  };
}

function getAppStorePath(srcPath: string) {
  const storeFileType = ['.js', '.ts'].find((fileType) => fse.pathExistsSync(path.join(srcPath, `store${fileType}`))) || '';
  // e.g: src/store.[j|t]s
  return storeFileType ? path.join(srcPath, `store${storeFileType}`) : '';
}

export default plugin;
