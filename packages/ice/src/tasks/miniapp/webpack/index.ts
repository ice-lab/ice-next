import * as path from 'path';
import { createRequire } from 'node:module';
import { RUNTIME_TMP_DIR } from '../../../constant.js';
import { MiniWebpackModule } from './module.js';
import { MiniWebpackPlugin } from './plugin.js';

const require = createRequire(import.meta.url);

export default function getMiniappWebpackConfig(rawConfig: any): any {
  const {
    rootDir,
    entry,
    outputDir,
    mode,
    globalObject,
  } = rawConfig;

  const webpackPlugin = new MiniWebpackPlugin(rawConfig);
  const webpackModule = new MiniWebpackModule(rawConfig);

  // TODO: 保留完整的 webpack 配置，后期融合完毕后删除
  const miniappWebpackConfig = {
    entry,
    output: {
      chunkLoadingGlobal: 'webpackJsonp',
      path: outputDir,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].js',
      globalObject,
      enabledLibraryTypes: [],
    },
    mode,
    sourceMap: mode === 'development' ? 'cheap-module-source-map' : false,

    devtool: 'cheap-module-source-map',
    target: ['web', 'es5'],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      symlinks: true,
      mainFields: ['browser', 'module', 'jsnext:main', 'main'],
      alias: {
        ice: path.join(rootDir, RUNTIME_TMP_DIR, 'index.miniapp.ts'),
        '@': path.join(rootDir, 'src'),
        // 小程序使用 regenerator-runtime@0.11
        'regenerator-runtime': require.resolve('regenerator-runtime'),
        // 开发组件库时 link 到本地调试，runtime 包需要指向本地 node_modules 顶层的 runtime，保证闭包值 Current 一致，shared 也一样
        '@ice/miniapp-runtime': require.resolve('@ice/miniapp-runtime'),
        '@tarojs/runtime': require.resolve('@tarojs/runtime'),
        '@tarojs/shared': require.resolve('@tarojs/shared/dist/shared.esm.js'),
        'react-dom$': require.resolve('@ice/miniapp-react-dom'),
      },
      fallback: {
        fs: false,
        path: false,
      },
    },
    resolveLoader: {
      modules: ['node_modules'],
    },
    plugins: webpackPlugin.getPlugins(),
    module: webpackModule.getModules(),
    watchOptions: {
      aggregateTimeout: 300,
    },
    optimization: {
      sideEffects: true,
      usedExports: true,
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          common: {
            name: 'common',
            minChunks: 2,
            priority: 1,
          },
          vendors: {
            name: 'vendors',
            minChunks: 2,
            test: module => /[\\/]node_modules[\\/]/.test(module.resource),
            priority: 10,
          },
          ice: {
            name: 'ice',
            test: module => /@ice[\\/][a-z]+/.test(module.context),
            priority: 101,
          },
          taro: {
            name: 'taro',
            test: module => /@tarojs[\\/][a-z]+/.test(module.context),
            priority: 100,
          },
        },
      },
    },
    performance: {
      maxEntrypointSize: 2 * 1000 * 1000,
    },
  };


  return miniappWebpackConfig;
}
