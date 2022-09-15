import * as path from 'path';
import consola from 'consola';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError } from 'webpack';
import type { Config } from '@ice/types';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { RUNTIME_TMP_DIR, SERVER_OUTPUT_DIR, WEB } from '../constant.js';
import generateHTML from '../utils/generateHTML.js';
import emptyDir from '../utils/emptyDir.js';
import getServerEntry from '../utils/getServerEntry.js';
import { getRoutePathsFromCache } from '../utils/getRoutePaths.js';

const build = async (
  context: Context<Config>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    spinner: ora.Ora;
    dataCache: Map<string, string>;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
  },
) => {
  const { taskConfigs, serverCompiler, spinner, getAppConfig, getRoutesConfig, dataCache } = options;
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const { platform = WEB } = commandArgs;
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));
  const outputDir = webpackConfigs[0].output.path;

  await emptyDir(outputDir);
  const hooksAPI = {
    serverCompiler,
    getAppConfig,
    getRoutesConfig,
  };
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs,
    taskConfigs,
    commandArgs,
    command,
    spinner,
    applyHook,
    hooksAPI,
    dataCache,
  });

  const { ssg, ssr, server: { format } } = userConfig;
  // compile server bundle
  const entryPoint = getServerEntry(rootDir, taskConfigs[0].config?.server?.entry);
  const esm = format === 'esm';
  const outJSExtension = esm ? '.mjs' : '.cjs';
  const serverOutputDir = path.join(outputDir, SERVER_OUTPUT_DIR);
  let serverEntry;
  const { stats, isSuccessful, messages } = await new Promise((resolve, reject): void => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run(async (err, stats) => {
      if (err) {
        if (!err.message) {
          reject(err);
          return;
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
        reject(new Error(messages.errors.join('\n\n')));
        return;
      } else {
        compiler?.close?.(() => {});
        const isSuccessful = !messages.errors.length;

        const shouldCompileServerBundle = platform === WEB;
        if (shouldCompileServerBundle) {
          const serverCompilerResult = await serverCompiler(
            {
              entryPoints: { index: entryPoint },
              outdir: serverOutputDir,
              splitting: esm,
              format,
              platform: esm ? 'browser' : 'node',
              outExtension: { '.js': outJSExtension },
            },
            {
              preBundle: format === 'esm' && (ssr || ssg),
              swc: {
                keepExports: (!ssg && !ssr) ? ['getConfig'] : null,
                keepPlatform: 'node',
                getRoutePaths: () => {
                  return getRoutePathsFromCache(dataCache);
                },
              },
            },
          );
          if (serverCompilerResult.error) {
            consola.error('Build failed.');
            return;
          }

          serverEntry = serverCompilerResult.serverEntry;

          let renderMode;
          if (ssg) {
            renderMode = 'SSG';
          }

          // generate html
          await generateHTML({
            rootDir,
            outputDir,
            entry: serverEntry,
            // only ssg need to generate the whole page html when build time.
            documentOnly: !ssg,
            renderMode,
          });
        }
        resolve({
          stats,
          messages,
          isSuccessful,
        });
      }
    });
  });

  await applyHook('after.build.compile', {
    stats,
    isSuccessful,
    messages,
    taskConfigs,
    serverCompiler,
    serverEntry,
    getAppConfig,
    getRoutesConfig,
  });

  return { compiler };
};

export default build;
