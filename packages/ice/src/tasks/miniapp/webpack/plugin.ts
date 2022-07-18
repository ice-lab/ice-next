import * as path from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import taroHelper from '@tarojs/helper';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import MiniPlugin from './plugins/MiniPlugin.js';

const { PLATFORMS } = taroHelper;
export class MiniWebpackPlugin {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  getPlugins() {
    const providerPlugin = this.getProviderPlugin();
    const definePlugin = this.getDefinePlugin();
    // const definePluginOptions = definePlugin.args[0];
    // const miniPlugin = this.getMainPlugin(definePluginOptions);
    const miniPlugin = this.getMainPlugin({});
    const plugins: Array<any> = [
      providerPlugin,
      definePlugin,
      miniPlugin,
    ];
    return plugins;
  }

  getProviderPlugin() {
    return new webpack.ProvidePlugin({
      window: ['@tarojs/runtime', 'window'],
      document: ['@tarojs/runtime', 'document'],
      navigator: ['@tarojs/runtime', 'navigator'],
      requestAnimationFrame: ['@tarojs/runtime', 'requestAnimationFrame'],
      cancelAnimationFrame: ['@tarojs/runtime', 'cancelAnimationFrame'],
      Element: ['@tarojs/runtime', 'TaroElement'],
      SVGElement: ['@tarojs/runtime', 'SVGElement'],
      MutationObserver: ['@tarojs/runtime', 'MutationObserver'],
    });
  }

  getDefinePlugin() {
    const {
      env = {},
      runtime = {} as Record<string, boolean>,
      defineConstants = {},
      framework = 'react',
      buildAdapter = PLATFORMS.WEAPP,
    } = this.config;

    env.FRAMEWORK = JSON.stringify(framework);
    env.TARO_ENV = JSON.stringify(buildAdapter);
    const envConstants = Object.keys(env).reduce((target, key) => {
      target[`process.env.${key}`] = env[key];
      return target;
    }, {});

    const runtimeConstants = {
      ENABLE_INNER_HTML: runtime.enableInnerHTML ?? true,
      ENABLE_ADJACENT_HTML: runtime.enableAdjacentHTML ?? false,
      ENABLE_SIZE_APIS: runtime.enableSizeAPIs ?? false,
      ENABLE_TEMPLATE_CONTENT: runtime.enableTemplateContent ?? false,
      ENABLE_CLONE_NODE: runtime.enableCloneNode ?? false,
      ENABLE_CONTAINS: runtime.enableContains ?? false,
      ENABLE_MUTATION_OBSERVER: runtime.enableMutationObserver ?? false,
    };
    const definitionsList = [envConstants, defineConstants, runtimeConstants];
    const definitions = Object.assign({}, ...definitionsList);
    return new webpack.DefinePlugin(definitions);
  }

  getMainPlugin(definePluginOptions) {
    const { rootDir, outputDir, runtimePath, nodeModulesPath, template, deviceRatio, fileType } = this.config;
    const sourceDir = path.join(rootDir, 'src');
    const options = {
      /** paths */
      sourceDir,
      outputDir,
      runtimePath,
      nodeModulesPath,
      /** config & message */
      framework: 'react',
      fileType,
      template,
      commonChunks: ['runtime', 'vendors', 'taro', 'common', 'ice'],
      designWidth: 750,
      deviceRatio,
      baseLevel: 16,
      minifyXML: {},
      alias: {},
      constantsReplaceList: definePluginOptions,
      /** building mode */
      hot: false,
    };
    return new MiniPlugin(options);
  }
}
