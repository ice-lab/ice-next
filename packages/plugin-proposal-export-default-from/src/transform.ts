import { createRequire } from 'module';
import type { Config } from '@ice/types';
import { transformSync } from '@babel/core';

const require = createRequire(import.meta.url);
// A transform plugin to support proposal-export-default-from.
const transformPlugin: Config['transformPlugins'][0] = () => {
  const extensionRegex = /\.(jsx?|tsx?|mjs)$/;
  const exportRegex = /export\s+default\s+from\s+["'](.*?)["']/;
  return {
    name: 'plugin-transform-proposal-export-default-from',
    transformInclude(id: string) {
      return extensionRegex.test(id);
    },
    transform: async (sourceCode: string, id: string) => {
      // Filter out the export default from statement.
      if (exportRegex.test(sourceCode)) {
        const { code, map } = transformSync(sourceCode, {
          babelrc: false,
          configFile: false,
          filename: id,
          parserOpts: {
            sourceType: 'module',
            allowAwaitOutsideFunction: true,
            // ts syntax had already been transformed by swc plugin.
            plugins: [
              'jsx',
              'importMeta',
              'topLevelAwait',
              'classProperties',
              'classPrivateMethods',
            ],
          },
          generatorOpts: {
            decoratorsBeforeExport: true,
          },
          sourceFileName: id,
          plugins: [require.resolve('@babel/plugin-proposal-export-default-from')],
        });
        return { code, map };
      }
    },
  };
};

export default transformPlugin;
