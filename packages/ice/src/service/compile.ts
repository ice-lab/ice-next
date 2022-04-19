import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import consola from 'consola';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import { getTransformPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import stylePlugin from '../esbuild/style.js';
import aliasPlugin from '../esbuild/alias.js';
import type { ContextConfig } from '../utils/getContextConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  rootDir: string;
  task: ContextConfig;
}

export function createEsbuildCompiler(options: Options) {
  const { task } = options;
  const { taskConfig, webpackConfig } = task;
  const transformPlugins = getTransformPlugins(taskConfig);
  const alias = (webpackConfig.resolve?.alias || {}) as Record<string, string | false>;

  const esbuildCompile: EsbuildCompile = async (buildOptions) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);

    const ICE_PREFIX = /^ICE_/i;
    const raw = Object.keys({ ...process.env }).filter(key => ICE_PREFIX.test(key))
      .reduce((env, key) => {
        env[`process.env.${key}`] = process.env[key];
        return env;
      }, {});

    const buildResult = await esbuild.build({
      bundle: true,
      target: 'node12.19.0',
      ...buildOptions,
      define: {
        // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
        // in esm, this in the global should be undefined. Set the following config to avoid warning
        this: undefined,
        // TOOD: sync ice runtime env
        'process.env.ICE_RUNTIME_SERVER': 'true',
      },
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      plugins: [
        stylePlugin({
          extract: false,
          modules: {
            auto: (filePath) => /\.module\.\w+$/i.test(filePath),
            generateLocalIdentName: function (name: string, filename: string) {
              const hash = createHash('md4');
              hash.update(Buffer.from(filename + name, 'utf8'));
              return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
            },
          },
        }),
        aliasPlugin({
          alias,
          compileRegex: (taskConfig.compileIncludes || []).map((includeRule) => {
            return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
          }),
        }),
        ...(buildOptions.plugins || []),
        ...transformPlugins
          // ignore compilation-plugin while esbuild has it's own transform
          .filter(({ name }) => name !== 'compilation-plugin')
          .map(plugin => createUnplugin(() => plugin).esbuild()),
      ],
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return esbuildCompile;
}
