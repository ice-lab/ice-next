import consola from 'consola';
import type { Context } from 'build-scripts';
import type { StatsError } from 'webpack';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import type { Config } from '@ice/types';
import type { TaskConfig } from '../utils/getTaskConfig.js';
import type { PreCompile } from '@ice/types/esm/plugin.js';

const build = async (context: Context<Config>, taskConfig: TaskConfig[], preCompile: PreCompile) => {
  const { applyHook, commandArgs, command, rootDir } = context;
  const webTask = taskConfig.find(({ name }) => name === 'web');
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfig: taskConfig.map(({ webpackConfig }) => webpackConfig),
    config: webTask.config,
    commandArgs,
    command,
    applyHook,
    preCompile,
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
