import * as path from 'path';
import consola from 'consola';
import WebpackDevServer from 'webpack-dev-server';
import type { Configuration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError } from 'webpack';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';
import type { ExtendsPluginAPI, ServerCompiler, GetAppConfig, GetRoutesConfig } from '@ice/types/esm/plugin.js';
import type { AppConfig, RenderMode } from '@ice/runtime';
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import prepareURLs from '../utils/prepareURLs.js';
import createRenderMiddleware from '../middlewares/ssr/renderMiddleware.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';
import { ROUTER_MANIFEST, RUNTIME_TMP_DIR, SERVER_OUTPUT_DIR, WEB, MINIAPP_PLATFORMS } from '../constant.js';
import ServerCompilerPlugin from '../webpack/ServerCompilerPlugin.js';
import ReCompilePlugin from '../webpack/ReCompilePlugin.js';
import getServerEntry from '../utils/getServerEntry.js';
import getRouterBasename from '../utils/getRouterBasename.js';
import emptyDir from '../utils/emptyDir.js';

const { merge } = lodash;

const start = async (
  context: Context<Config, ExtendsPluginAPI>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    appConfig: AppConfig;
    devPath: string;
    spinner: ora.Ora;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
    dataCache: Map<string, string>;
    reCompileRouteConfig: () => void;
  },
) => {
  const {
    taskConfigs,
    serverCompiler,
    appConfig,
    devPath,
    spinner,
    reCompileRouteConfig,
    getAppConfig,
    getRoutesConfig,
    dataCache,
  } = options;
  const { applyHook, commandArgs, command, rootDir, userConfig, extendsPluginAPI: { serverCompileTask } } = context;
  const { platform, port, host, https = false } = commandArgs;
  const webTaskConfig = taskConfigs.find(({ name }) => name === 'web');
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));

  const hooksAPI = {
    serverCompiler,
    getAppConfig,
    getRoutesConfig,
  };

  if (platform === WEB) {
    // Compile server entry after the webpack compilation.
    const outputDir = webpackConfigs[0].output.path;
    const { ssg, ssr, server: { format } } = userConfig;
    const entryPoint = getServerEntry(rootDir, taskConfigs[0].config?.server?.entry);
    const esm = format === 'esm';
    const outJSExtension = esm ? '.mjs' : '.cjs';
    webpackConfigs[0].plugins.push(
      new ServerCompilerPlugin(
        serverCompiler,
        [
          {
            entryPoints: { index: entryPoint },
            outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
            splitting: esm,
            format,
            platform: esm ? 'browser' : 'node',
            outExtension: { '.js': outJSExtension },
          },
          {
            preBundle: format === 'esm' && (ssr || ssg),
            swc: {
              // Remove components and getData when document only.
              removeExportExprs: false ? ['default', 'getData', 'getServerData', 'getStaticData'] : [],
              keepPlatform: 'node',
            },
          },
        ],
        serverCompileTask,
      ),
      new ReCompilePlugin(reCompileRouteConfig, (files) => {
        // Only when routes file changed.
        const routeManifest = JSON.parse(dataCache.get('routes'))?.routeManifest || {};
        const routeFiles = Object.keys(routeManifest).map((key) => {
          const { file } = routeManifest[key];
          return `src/pages/${file}`;
        });
        return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
      }),
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
        const routeManifestPath = path.join(rootDir, ROUTER_MANIFEST);
        // both ssr and ssg, should render the whole page in dev mode.
        const documentOnly = !ssr && !ssg;

        const serverRenderMiddleware = createRenderMiddleware({
          serverCompileTask,
          routeManifestPath,
          documentOnly,
          renderMode,
          getAppConfig,
          taskConfig: webTaskConfig,
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
    let urlPathname = getRouterBasename(webTaskConfig, appConfig) || '/';

    const urls = prepareURLs(
      protocol,
      devServerConfig.host,
      devServerConfig.port as number,
      urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`,
    );
    const compiler = await webpackCompiler({
      rootDir,
      webpackConfigs,
      taskConfigs,
      urls,
      commandArgs,
      command,
      applyHook,
      hooksAPI,
      spinner,
      devPath,
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
    const outputDir = webpackConfigs[0].output.path;
    await emptyDir(outputDir);
    const compiler = await webpackCompiler({
      rootDir,
      webpackConfigs,
      taskConfigs,
      commandArgs,
      command,
      spinner,
      applyHook,
      hooksAPI,
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
    });
    return { compiler };
  }
};

export default start;
