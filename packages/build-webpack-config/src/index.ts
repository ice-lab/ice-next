import * as path from 'path';
import { createRequire } from 'module';
import fg from 'fast-glob';
import consola from 'consola';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CssMinimizerPlugin from '@builder/pack/deps/css-minimizer-webpack-plugin/cjs.js';
import TerserPlugin from '@builder/pack/deps/terser-webpack-plugin/cjs.js';
import webpack, { type Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import type { CommandArgs } from 'build-scripts';
import { createUnplugin } from 'unplugin';
import browserslist from 'browserslist';
import getTransformPlugins from './plugins/index.js';
import configAssets from './config/assets.js';
import configCss from './config/css.js';

const require = createRequire(import.meta.url);

const watchIgnoredRegexp = ['**/.git/**', '**/node_modules/**'];

interface GetWebpackConfigOptions {
  rootDir: string;
  config: Config;
  commandArgs?: CommandArgs;
}
type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };
type GetWebpackConfig = (options: GetWebpackConfigOptions) => WebpackConfig;

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
    outputDir = path.join(rootDir, 'build'),
    loaders = [],
    alias = {},
    sourceMap,
    middlewares,
    proxy,
    configureWebpack,
    experimental,
    hash,
  } = config;

  const dev = mode !== 'production';
  const supportedBrowsers = getSupportedBrowsers(rootDir, dev);
  const hashKey = hash === true ? 'hash:8' : (hash || '');
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

  const terserOptions: any = {
    parse: {
      ecma: 8,
    },
    compress: {
      ecma: 5,
      warnings: false,
      unused: false,
      // The following two options are known to break valid JavaScript code
      // https://github.com/vercel/next.js/issues/7178#issuecomment-493048965
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      safari10: true,
      comments: false,
      // Fixes usage of Emoji and certain Regex
      ascii_only: true,
    },
  };

  const minimizerOptions = {
    preset: [
      'default',
      {
        discardComments: { removeAll: true },
      },
    ],
    processorOptions: {
      map: {
        // `inline: false` generates the source map in a separate file.
        inline: false,
        // `annotation: false` skips appending the `sourceMappingURL`
        // to the end of the CSS file. Webpack already handles this.
        annotation: false,
      },
    },
  };

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
      path: path.isAbsolute(outputDir) ? outputDir : path.join(rootDir, outputDir),
      filename: hashKey ? `[name]-[${hashKey}].js` : '[name].js',
    },
    context: rootDir,
    module: {
      rules: [
        ...loaders,
      ],
    },
    resolve: {
      alias,
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
        new TerserPlugin({
          minify: TerserPlugin.esbuildMinify,
          parallel: experimental?.parallel || false,
          extractComments: false,
          terserOptions,
        }),
        new CssMinimizerPlugin({
          minimizerOptions,
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
        publicPath,
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

  // pipe webpack by built-in functions and custom functions
  const ctx = {
    ...config,
    supportedBrowsers,
    hashKey,
  };
  const finalWebpackConfig = [configCss, configAssets, ...(configureWebpack || [])].reduce((result, next) => {
    return next(result, ctx);
  }, webpackConfig);
  consola.debug('[webpack]', finalWebpackConfig);

  return finalWebpackConfig;
};

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
