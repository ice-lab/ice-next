import type { IMiniappWebpackOptions, IMiniappWebpackConfig } from '../types.js';
import { MiniWebpackModule } from './module.js';
import { MiniWebpackPlugin } from './plugin.js';

export default function getMiniappWebpackConfig(rawConfig: IMiniappWebpackOptions): IMiniappWebpackConfig {
  const webpackPlugin = new MiniWebpackPlugin(rawConfig);
  const webpackModule = new MiniWebpackModule(rawConfig);

  return {
    plugins: webpackPlugin.getPlugins(),
    module: webpackModule.getModules(),
  };
}
