import type { Plugin } from '@ice/types';
// @ts-ignore
import ExtractCssAssetsWebpackPlugin from 'extract-css-assets-webpack-plugin';
import consola from 'consola';

interface PluginOptions {
  /**
   * The assets path
   *
   * Default value: `assets`
   */
  outputPath?: string;
  /**
   * The asset paths relative to the css file path
   *
   * Default value: `../`
   */
  relativeCssPath?: string;
  /**
   *
   * Default value: `false`
   */
  enableInDev?: boolean;
}

const plugin: Plugin<PluginOptions> = (options = {}) => ({
  name: '@ice/plugin-css-assets-local',
  setup: ({ onGetConfig, context: { command } }) => {
    const {
      outputPath = 'assets',
      relativeCssPath = '../',
      enableInDev = false,
    } = options;
    // it is increase dev build time by set default activeCommands ['build']
    const activeCommands = enableInDev ? ['start', 'build'] : ['build'];
    if (activeCommands.indexOf(command) > -1) {
      consola.info('\n离线化构建项目，自动下载网络资源，请耐心等待');
      onGetConfig((config) => {
        config.plugins ??= [];
        config.plugins.push(new ExtractCssAssetsWebpackPlugin({
          outputPath,
          relativeCssPath,
          forceLocal: true,
        }));
      });
    }
  },
});

export default plugin;
