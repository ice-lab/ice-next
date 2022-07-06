import * as path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import type { Configuration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { RenderMode } from '@ice/runtime';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import createRenderMiddleware from '../middlewares/ssr/renderMiddleware.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';
import { ROUTER_MANIFEST, RUNTIME_TMP_DIR, SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../constant.js';
import ServerCompilerPlugin from '../webpack/ServerCompilerPlugin.js';
import ServerCompilerTask from '../utils/ServerCompilerTask.js';
import { getAppConfig } from '../analyzeRuntime.js';

const { merge } = lodash;

const start = async (context: Context<Config>, taskConfigs: TaskConfig<Config>[], serverCompiler: ServerCompiler) => {
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const { port, host, https = false } = commandArgs;

  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));

  const serverCompilerTask = new ServerCompilerTask();

  const { outputDir } = taskConfigs.find(({ name }) => name === 'web').config;
  const { ssg, ssr, server } = userConfig;
  const entryPoint = path.join(rootDir, SERVER_ENTRY);
  const { format } = server;
  const esm = format === 'esm';
  const outJSExtension = esm ? '.mjs' : '.cjs';
  webpackConfigs[0].plugins.push(
    new ServerCompilerPlugin(
      serverCompiler,
      {
        entryPoints: { index: entryPoint },
        outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
        splitting: esm,
        format,
        platform: esm ? 'browser' : 'node',
        outExtension: { '.js': outJSExtension },
      },
      serverCompilerTask,
    ),
  );

  const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
  let devServerConfig: Configuration = {
    port,
    host,
    https,
    setupMiddlewares: (middlewares, devServer) => {
      let renderMode: RenderMode;
      // If ssr is set to true, use ssr for preview.
      if (ssr) {
        renderMode = 'SSR';
      } else if (ssg) {
        renderMode = 'SSG';
      }
      const appConfig = getAppConfig();
      const routeManifestPath = path.join(rootDir, ROUTER_MANIFEST);
      const serverRenderMiddleware = createRenderMiddleware({
        serverCompilerTask,
        routeManifestPath,
        documentOnly: !ssr && !ssg,
        renderMode,
        basename: appConfig?.router?.basename,
      });
      const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
      middlewares.splice(
        insertIndex, 0,
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
  const compiler = await webpackCompiler({
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
};

export default start;
