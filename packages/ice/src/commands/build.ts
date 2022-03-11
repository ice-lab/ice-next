import consola from 'consola';
import type { Context } from 'build-scripts';
import type { StatsError } from 'webpack';
import type { Config } from '@ice/types';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import type { TaskConfig } from '../utils/getTaskConfig.js';

const build = async (context: Context<Config>, taskConfig: TaskConfig[], esbuildCompile: EsbuildCompile) => {
  const { applyHook, commandArgs, command, rootDir } = context;
  const webTask = taskConfig.find(({ name }) => name === 'web');
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs: taskConfig.map(({ webpackConfig }) => webpackConfig),
    taskConfig: webTask.config,
    commandArgs,
    command,
    applyHook,
    esbuildCompile,
  });
  await new Promise((resolve, reject): void => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run((err, stats) => {
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
        resolve({
          stats,
        });
      }
    });
  });
  return compiler;
};

export default build;
