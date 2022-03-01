import path from 'path';
import { createRequire } from 'module';
import swcPlugin from './swcPlugin.js';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin/lib/index.js';
import MiniCssExtractPlugin from '@builder/pack/deps/mini-css-extract-plugin/cjs.js';
import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';

const require = createRequire(import.meta.url);
const dev = process.env.NODE_ENV !== 'production';
const watchIgnoredRegexp = process.env.RUNTIME_DEBUG ? /node_modules/ : /node_modules|[/\\]\.ice[/\\]|[/\\]\.rax[/\\]/;

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
}
type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };
type GetWebpackConfig = (options: GetWebpackConfigOptions) => WebpackConfig;
type CSSRuleConfig = [string, string?, Record<string, any>?];

export const getDefaultPlugins = () => {

};

export const getWebpackConfig: GetWebpackConfig = ({ rootDir, config }) => {
  const {
    mode,
    externals = {},
    publicPath = '/',
    devPublicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
  } = config;

  const webpackConfig: WebpackConfig = {
    mode,
    entry: path.join(rootDir, 'src/app'),
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    module: {
      rules: [
        ...([
          ['css'],
          ['less', require.resolve('@builder/pack/deps/less-loader'), ({ lessOptions: { javascriptEnabled: true } })],
          ['scss', require.resolve('@builder/pack/deps/sass-loader')],
        ] as CSSRuleConfig[]).map((config) => configCSSRule(config)).flat(),
        ...loaders,
        // {
        //   test: /\.tsx?$/,
        //   use: [
        //     {
        //       loader: require.resolve('swc-loader'),
        //       options: {
        //         env: { mode: 'usage' },
        //         jsc: {
        //           parser: {
        //             syntax: 'typescript',
        //             tsx: true,
        //             dynamicImport: true,
        //           },
        //           transform: {
        //             react: {
        //               // swc-loader will check whether webpack mode is 'development'
        //               // and set this automatically starting from 0.1.13. You could also set it yourself.
        //               // swc won't enable fast refresh when development is false
        //               runtime: 'automatic',
        //               refresh: true,
        //             },
        //           },
        //         },
        //       },
        //     },
        //   ],
        // },
      ],
    },
    resolve: {
      alias: {
        ice: path.join(rootDir, '.ice', 'index.ts'),
        ...alias,
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
      fallback: { events: require.resolve('events') },
    },
    watchOptions: {
      ignored: watchIgnoredRegexp,
    },
    performance: false,
    devtool: getDevtoolValue(sourceMap),
    plugins: [
      swcPlugin({ rootDir, sourceMap, dev, mode }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      dev && new ReactRefreshWebpackPlugin({ esModule: true, forceEnable: true }),
    ].filter(Boolean),
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      hot: true,
      compress: true,
      webSocketServer: 'ws',
      devMiddleware: {
        publicPath: devPublicPath,
      },
      static: {
        watch: {
          ignored: watchIgnoredRegexp,
        },
      },
      client: {
        overlay: true,
        logging: 'info',
      },
      setupMiddlewares: middlewares,
    },
  };

  return webpackConfig;
};

function configCSSRule(config: CSSRuleConfig) {
  const [style, loader, loaderOptions] = config;
  const cssLoaderOpts = {
    sourceMap: true,
  };
  const cssModuleLoaderOpts = {
    ...cssLoaderOpts,
    modules: {
      auto: (resourcePath: string) => resourcePath.endsWith(`.module.${style}`),
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    },
  };
    return {
      test: new RegExp(`\\.${style}$`),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          // compatible with commonjs syntax: const styles = require('./index.module.less')
          options: { esModule: false },
        },
        {
          loader: require.resolve('@builder/pack/deps/css-loader'),
          options: cssModuleLoaderOpts,
        },
        // TODO: add postcss-loader
        // {
        //   loader: require.resolve('@builder/pack/deps/postcss-loader'),
        // },
        loader && {
          loader,
          options: { ...cssLoaderOpts, ...loaderOptions },
        },
      ].filter(Boolean),
    };
}

function getDevtoolValue(sourceMap: Config['sourceMap']) {
  if (typeof sourceMap === 'string') {
    return sourceMap;
  } else if (sourceMap === false) {
    return false;
  }

  return 'source-map';
}