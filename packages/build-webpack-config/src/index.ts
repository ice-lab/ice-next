import * as path from 'path';
import { createRequire } from 'module';
import fg from 'fast-glob';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from '@builder/pack/deps/mini-css-extract-plugin/cjs.js';
import CssMinimizerPlugin from '@builder/pack/deps/css-minimizer-webpack-plugin/cjs.js';
import safeParser from '@builder/pack/deps/postcss-safe-parser/safe-parse.js';
import TerserPlugin from '@builder/pack/deps/terser-webpack-plugin/cjs.js';
import webpack, { type Configuration } from 'webpack';
import postcss from 'postcss';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import type { CommandArgs } from 'build-scripts';
import { createUnplugin } from 'unplugin';
import browserslist from 'browserslist';
import getTransformPlugins from './plugins/index.js';

const require = createRequire(import.meta.url);

const watchIgnoredRegexp = ['**/.git/**', '**/node_modules/**'];

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
  commandArgs?: CommandArgs;
}
type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };
type GetWebpackConfig = (options: GetWebpackConfigOptions) => WebpackConfig;
type CSSRuleConfig = [string, string?, Record<string, any>?];
type AssetRuleConfig = [RegExp, Record<string, any>?];

function getEntry(rootDir: string) {
  // check entry.client.ts
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: rootDir,
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, '.ice/entry.client.ts');
  }
  return {
    runtime: ['react', 'react-dom', '@ice/runtime'],
    index: {
      import: [entryFile],
      dependOn: 'runtime',
    },
  };
}

const getWebpackConfig: GetWebpackConfig = ({ rootDir, config, commandArgs = {} }) => {
  const {
    mode,
    define,
    externals = {},
    publicPath = '/',
    devPublicPath = '/',
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
    proxy,
  } = config;

  const dev = mode !== 'production';
  const defineVariables = {
    ...define || {},
    'process.env.NODE_ENV': mode || 'development',
    'process.env.SERVER_PORT': commandArgs.port,
  };
  // formate define variables
  Object.keys(defineVariables).forEach((key) => {
    defineVariables[key] = typeof defineVariables[key] === 'boolean'
      ? defineVariables[key]
      : JSON.stringify(defineVariables[key]);
  });

  // create plugins
  const webpackPlugins = getTransformPlugins(rootDir, config).map((plugin) => createUnplugin(() => plugin).webpack());

  const assetsRule = ([
    [/\.woff2?$/, { mimetype: 'application/font-woff' }],
    [/\.ttf$/, { mimetype: 'application/octet-stream' }],
    [/\.eot$/, { mimetype: 'application/vnd.ms-fontobject' }],
    [/\.svg$/, { mimetype: 'image/svg+xml' }],
    [/\.(png|jpg|webp|jpeg|gif)$/i],
  ] as AssetRuleConfig[]).map((config) => configAssetsRule(config));

  const supportedBrowsers = getSupportedBrowsers(rootDir, dev);
  const webpackConfig: WebpackConfig = {
    mode,
    experiments: {
      layers: true,
      cacheUnaffected: true,
      topLevelAwait: true,
    },
    entry: () => getEntry(rootDir),
    externals,
    output: {
      publicPath,
      path: outputDir,
    },
    context: rootDir,
    module: {
      parser: {
        javascript: {
          url: 'relative',
        },
      },
      generator: {
        asset: {
          filename: 'assets/[name].[hash:8][ext]',
        },
      },
      rules: [
        ...([
          ['css'],
          ['less', require.resolve('@builder/pack/deps/less-loader'), ({ lessOptions: { javascriptEnabled: true } })],
          ['scss', require.resolve('@builder/pack/deps/sass-loader')],
        ] as CSSRuleConfig[]).map((config) => configCSSRule(config, supportedBrowsers)).flat(),
        ...assetsRule,
        {
          test: /\.(png|jpg|gif|jpeg|woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'assets/[hash].[ext]',
              },
            },
          ],
        },
        ...loaders,
      ],
    },
    resolve: {
      alias: {
        ...alias,
      },
      extensions: ['.ts', '.tsx', '.jsx', '...'],
      fallback: {
        // TODO: add more fallback module
        events: require.resolve('events'),
      },
    },
    watchOptions: {
      ignored: watchIgnoredRegexp,
    },
    optimization: {
      minimizer: [
        '...',
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          parallel: true,
          extractComments: false,
          terserOptions: {
            compress: {
              unused: false,
            },
            output: {
              ascii_only: true,
              comments: 'some',
              beautify: false,
            },
            mangle: true,
          },
        }),
        new CssMinimizerPlugin({
          parallel: false,
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
            processorOptions: {
              parser: safeParser,
            },
          },
        }),
      ],
    },
    cache: {
      type: 'filesystem',
      version: `${process.env.__ICE_VERSION__}|${JSON.stringify(config)}`,
      buildDependencies: { config: [path.join(rootDir, 'package.json')] },
      cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
    },
    // custom stat output by stats.toJson() calls in plugin-app
    stats: 'none',
    infrastructureLogging: {
      level: 'warn',
    },
    performance: false,
    devtool: getDevtoolValue(sourceMap),
    plugins: [
       ...webpackPlugins,
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.DefinePlugin(defineVariables),
      dev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      proxy,
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

  if (dev) {
    if (!webpackConfig.optimization) {
      webpackConfig.optimization = {};
    }
    // do not figure out file exports when dev
    webpackConfig.optimization.providedExports = false;
    webpackConfig.optimization.usedExports = false;
  }

  if (process.env.WEBPACK_LOGGING) {
    webpackConfig.infrastructureLogging = {
      level: 'verbose',
      debug: /FileSystemInfo/,
    };
    webpackConfig.stats = 'verbose';
  }

  return webpackConfig;
};

function configAssetsRule(config: AssetRuleConfig) {
  const [test, dataUrl] = config;
  return {
    test,
    generator: {
      dataUrl,
    },
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024, // 8kb
      },
    },
  };
}

function configCSSRule(config: CSSRuleConfig, browsers: string[]) {
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
  const postcssOpts = {
    // lock postcss version
    implementation: postcss,
    postcssOptions: {
      config: false,
      plugins: [
        ['@builder/pack/deps/postcss-nested'],
        ['@builder/pack/deps/postcss-preset-env', {
          // Without any configuration options, PostCSS Preset Env enables Stage 2 features.
          stage: 3,
          autoprefixer: {
            // Disable legacy flexbox support
            flexbox: 'no-2009',
          },
          features: {
            'custom-properties': false,
          },
          browsers,
        }],
      ],
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
      {
        loader: require.resolve('@builder/pack/deps/postcss-loader'),
        options: {
          ...cssLoaderOpts,
          ...postcssOpts,
        },
      },
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

function getSupportedBrowsers(
  dir: string,
  isDevelopment: boolean,
): string[] | undefined {
  let browsers: any;
  try {
    browsers = browserslist.loadConfig({
      path: dir,
      env: isDevelopment ? 'development' : 'production',
    });
  } catch {}
  return browsers;
}

export {
  getWebpackConfig,
  getTransformPlugins,
};
