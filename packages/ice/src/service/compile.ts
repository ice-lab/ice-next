import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import consola from 'consola';
import esbuild from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import { getTransformPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import aliasPlugin from '../esbuild/alias.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import routeModulePlugin from '../esbuild/routeModule.js';

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
  const { define = {} } = taskConfig;

  // auto stringify define value
  const defineVars = {};
  Object.keys(define).forEach((key) => {
    defineVars[key] = JSON.stringify(define[key]);
  });

  const esbuildCompile: EsbuildCompile = async (buildOptions) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const define = {
      // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
      // in esm, this in the global should be undefined. Set the following config to avoid warning
      this: undefined,
      ...defineVars,
      ...buildOptions.define,
    };

    const isCSR = process.env.ICE_CORE_SSR === 'false' || process.env.ICE_CORE_SSG === 'false';

    const buildResult = await esbuild.build({
      bundle: true,
      target: 'node12.20.0',
      ...buildOptions,
      define,
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      plugins: [
        // FIXME: set by build options.
        routeModulePlugin({
          rootDir: options.rootDir,
          exports: isCSR ? ['getConfig'] : ['*'],
        }, /\?server$/),
        emptyCSSPlugin(),
        aliasPlugin({
          alias,
          compileRegex: (taskConfig.compileIncludes || []).map((includeRule) => {
            return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
          }),
        }),
        cssModulesPlugin({
          extract: false,
          generateLocalIdentName: function (name: string, filename: string) {
            const hash = createHash('md4');
            hash.update(Buffer.from(filename + name, 'utf8'));
            return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
          },
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


