import consola from 'consola';
import WebpackDevServer from 'webpack-dev-server';
import type { Configuration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError } from 'webpack';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import prepareURLs from '../utils/prepareURLs.js';
import createCompileMiddleware from '../middlewares/ssr/compileMiddleware.js';
import createRenderMiddleware from '../middlewares/ssr/renderMiddleware.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';
import { WEB, MINIAPP_PLATFORMS } from '../constant.js';

const { merge } = lodash;

const start = async (context: Context<Config>, taskConfigs: TaskConfig<Config>[], serverCompiler: ServerCompiler) => {
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const { platform, port, host, https = false } = commandArgs;

  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
  }));
  let compiler;
  if (platform === WEB) {
    const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
    let devServerConfig: Configuration = {
      port,
      host,
      https,
      setupMiddlewares: (middlewares, devServer) => {
        const { outputDir } = taskConfigs.find(({ name }) => name === 'web').config;
        const { ssg, ssr, server } = userConfig;
  
        const serverCompileMiddleware = createCompileMiddleware({ rootDir, outputDir, serverCompiler, server });
        const serverRenderMiddleware = createRenderMiddleware({ documentOnly: !ssr && !ssg });
        const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
        middlewares.splice(
          insertIndex, 0,
          serverCompileMiddleware,
          serverRenderMiddleware,
        );
        if (commandArgs.mock) {
          const mockMiddleware = createMockMiddleware({ rootDir, exclude: userConfig?.mock?.exclude });
          middlewares.splice(insertIndex, 0, mockMiddleware);
        }
        return customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
      },
    };
    // merge devServerConfig with webpackConfig.devServer
    devServerConfig = merge(webpackConfigs[0].devServer, devServerConfig);
    const protocol = devServerConfig.https ? 'https' : 'http';
    const urls = prepareURLs(
      protocol,
      devServerConfig.host,
      devServerConfig.port as number,
    );
    compiler = await webpackCompiler({
      rootDir,
      webpackConfigs,
      taskConfigs,
      urls,
      commandArgs,
      command,
      applyHook,
      serverCompiler,
    });
    const devServer = new WebpackDevServer(devServerConfig, compiler);
    devServer.startCallback(() => {
      applyHook('after.start.devServer', {
        urls,
        devServer,
      });
    });
    return { compiler, devServer };
  } else if (MINIAPP_PLATFORMS.includes(platform)) {
    compiler = await webpackCompiler({
      rootDir,
      webpackConfigs,
      taskConfigs,
      commandArgs,
      command,
      applyHook,
      serverCompiler,
    });
    let messages: { errors: string[]; warnings: string[] };
    compiler.watch({
      aggregateTimeout: 300,
      poll: undefined,
    }, async (err, stats) => {
      if (err) {
        if (!err.message) {
          throw err;
        }
        messages = formatWebpackMessages({
          errors: [err.message as unknown as StatsError],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
      }

      if (messages.errors.length) {
        consola.error('webpack compile error');
        throw new Error(messages.errors.join('\n\n'));
      }
    })
    return { compiler };
  }
};

export default start;
