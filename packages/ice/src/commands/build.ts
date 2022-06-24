import * as path from 'path';
import consola from 'consola';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError } from 'webpack';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { AppConfig } from '@ice/runtime';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../constant.js';
import generateHTML from '../utils/generateHTML.js';
import emptyDir from '../utils/emptyDir.js';

const build = async (
  context: Context<Config>,
  taskConfigs: TaskConfig<Config>[],
  serverCompiler: ServerCompiler,
  appConfig: AppConfig,
) => {
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
  }));
  await emptyDir(taskConfigs.find(({ name }) => name === 'web').config.outputDir);
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs,
    taskConfigs,
    commandArgs,
    command,
    applyHook,
    serverCompiler,
  });
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
        const { outputDir } = taskConfigs.find(({ name }) => name === 'web').config;
        const { ssg, ssr, server } = userConfig;
        // compile server bundle
        const entryPoint = path.join(rootDir, SERVER_ENTRY);
        const esm = server?.format === 'esm';
        const outJSExtension = esm ? '.mjs' : '.cjs';
        const absoluteOutputDir = path.join(rootDir, outputDir);
        const serverOutputDir = path.join(absoluteOutputDir, SERVER_OUTPUT_DIR);
        const serverEntry = path.join(serverOutputDir, `index${outJSExtension}`);
        await serverCompiler({
          entryPoints: { index: entryPoint },
          outdir: serverOutputDir,
          splitting: esm,
          format: server?.format,
          platform: esm ? 'browser' : 'node',
          outExtension: { '.js': outJSExtension },
        });
        // generate html
        await generateHTML({
          rootDir,
          absoluteOutputDir,
          entry: serverEntry,
          documentOnly: !ssg && !ssr,
          basename: appConfig?.router?.basename,
        });
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
  });
  return { compiler };
};

export default build;
