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

    const buildResult = await esbuild.build({
      bundle: true,
      platform: 'browser',
      format: 'esm',
      ...buildOptions,
      define,
      treeShaking: true,
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      plugins: [
        browserRouteModulesPlugin({
          rootDir: options.rootDir,
        }, /\?browser$/),
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

const browserSafeRouteExports: { [name: string]: boolean } = {
  // getConfig: true,
  // CatchBoundary: true,
  // ErrorBoundary: true,
  default: true,
  // handle: true,
  // links: true,
  // meta: true,
  // unstable_shouldReload: true
};

function browserRouteModulesPlugin(
  config: any,
  suffixMatcher: RegExp,
): esbuild.Plugin {
  return {
    name: 'browser-route-modules',
    async setup(build) {
      build.onResolve({ filter: suffixMatcher }, args => {
        return { path: args.path, namespace: 'browser-route-module' };
      });

      build.onLoad(
        { filter: suffixMatcher, namespace: 'browser-route-module' },
        async args => {
          console.log('browser-route-modules');
          // console.log(args);

          let exports;
          try {
            exports = (
              await getRouteModuleExports(config)
            ).filter(ex => !!browserSafeRouteExports[ex]);
          } catch (error: any) {
            return {
              errors: [
                {
                  text: error.message,
                  pluginName: 'browser-route-module',
                },
              ],
            };
          }

          const file = path.resolve(config.rootDir, 'src/pages/index.js');

          let spec = exports.length > 0 ? `{ ${exports.join(', ')} }` : '*';
          let contents = `export ${spec} from '${file}';`;

          console.log(contents);
          return {
            contents,
            resolveDir: file,
            // resolveDir: path.dirname(args.file),
            loader: 'js',
          };
        },
      );
    },
  };
}

export async function getRouteModuleExports(
  config: any,
): Promise<string[]> {
  let result = await esbuild.build({
    entryPoints: [
      path.resolve(config.rootDir, 'src/pages/index.js'),
    ],
    platform: 'neutral',
    format: 'esm',
    metafile: true,
    write: false,
    logLevel: 'silent',
  });
  let metafile = result.metafile!;

  for (let key in metafile.outputs) {
    let output = metafile.outputs[key];
    if (output.entryPoint) return output.exports;
  }
}
