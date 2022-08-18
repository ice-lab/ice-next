import type { Config } from '@ice/types';
import type { BuildOptions } from 'esbuild';
import unplugin from '@ice/bundles/compiled/unplugin/index.js';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import compilationPlugin from './unPlugins/compilation.js';
import type { WebpackConfig } from './index.js';

type Compiler = 'webpack' | 'esbuild';

const { createUnplugin } = unplugin;
const SKIP_COMPILE = [
  // polyfill and helpers
  'core-js', 'core-js-pure', '@swc/helpers', '@babel/runtime',
  // built-in runtime
  'react', 'react-dom',
  // dev dependencies
  '@pmmmwh/react-refresh-webpack-plugin', 'webpack', 'webpack-dev-server', 'react-refresh',
];

function getPluginTransform(plugin: UnpluginOptions, type: 'esbuild' | 'webpack') {
  const { transform } = plugin;
  if (transform) {
    return {
      ...plugin,
      transform(code: string, id: string) {
        return transform.call(this, code, id, {
          isServer: type === 'esbuild',
        });
      },
    } as UnpluginOptions;
  }

  return plugin;
}

function getCompilerPlugins(config: Config, compiler: 'webpack'): WebpackConfig['plugins'];
function getCompilerPlugins(config: Config, compiler: 'esbuild'): BuildOptions['plugins'];
function getCompilerPlugins(config: Config, compiler: Compiler) {
  const {
    sourceMap,
    transformPlugins = [],
    transforms = [],
    mode,
    compileIncludes,
    swcOptions,
    fastRefresh,
    cacheDir,
  } = config;
  const compilerPlugins = [];
  const compileExcludes = [
    new RegExp(SKIP_COMPILE.map((dep) => `node_modules/?.+${dep}/`).join('|')),
    /bundles\/compiled/,
  ];
  // Add custom transform before swc compilation so the source code can be got before transformed.
  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => !enforce || enforce === 'pre') || []),
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  );

  if (swcOptions) {
    compilerPlugins.push(compilationPlugin({
      cacheDir,
      sourceMap,
      fastRefresh,
      mode,
      compileIncludes,
      compileExcludes,
      swcOptions,
    }));
  }

  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => enforce === 'post') || []),
  );

  return compiler === 'webpack'
    // Plugins will be transformed as webpack loader, the execute order of webpack loader is reversed.
    ? compilerPlugins.reverse().map(plugin => createUnplugin(() => getPluginTransform(plugin, 'webpack')).webpack())
    : compilerPlugins.map(plugin => getPluginTransform(plugin, 'esbuild'));
}

export default getCompilerPlugins;
