import { createHash } from 'crypto';
import consola from 'consola';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';
import type { Config } from '@ice/types';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import stylePlugin from '../plugins/esbuild/style.js';
import aliasPlugin from '../plugins/esbuild/alias.js';

export function createEsbuildCompiler(options: {
  alias?: Record<string, string>;
  getTransformPlugins?: (config: Partial<Config>) => UnpluginOptions[];
}) {
  const { alias = {}, getTransformPlugins } = options;
  const esbuildCompile: EsbuildCompile = async (buildOptions, customConfig) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const transformPlugins = getTransformPlugins(customConfig);
    const buildResult = await esbuild.build({
      bundle: true,
      ...buildOptions,
      // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
      // in esm, this in the global should be undefined. Set the following config to avoid warning
      define: {
        this: undefined,
      },
      plugins: [
        stylePlugin({
          modules: {
            auto: (filePath) => /\.module\.\w+$/i.test(filePath),
            generateLocalIdentName: function (name: string, filename: string) {
              const hash = createHash('md4');
              hash.update(Buffer.from(filename + name, 'utf8'));
              return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
            },
          },
        }),
        aliasPlugin({ alias }),
        ...transformPlugins.map(plugin => createUnplugin(() => plugin).esbuild()),
      ],
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return esbuildCompile;
}
