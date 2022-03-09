import WebpackDevServer from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import lodash from '@builder/pack/deps/lodash/lodash.js';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import type { Config } from '@ice/types';
import type { TaskConfig } from '../utils/getTaskConfig.js';
import type { PreCompile } from '@ice/types/esm/plugin.js';

const { defaultsDeep } = lodash;

type DevServerConfig = Record<string, any>;
// TODO config type of ice.js
const start = async (context: Context<Config>, taskConfig: TaskConfig[], preCompile: PreCompile) => {
  const { applyHook, commandArgs, command } = context;

  // TODO: task includes miniapp / kraken / pha
  const { webpackConfig } = taskConfig.find(({ name }) => name === 'web');

  let devServerConfig: DevServerConfig = {
    port: commandArgs.port || 3333,
    host: commandArgs.host || '0.0.0.0',
    https: commandArgs.https || false,
  };

  // merge devServerConfig with webpackConfig.devServer
  devServerConfig = defaultsDeep(webpackConfig.devServer, devServerConfig);

  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port,
  );
  const compiler = await webpackCompiler({
    config: webpackConfig,
    urls,
    commandArgs,
    command,
    applyHook,
    preCompile,
  });
  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls, devServer,
    });
  });
  return devServer;
};

export default start;
