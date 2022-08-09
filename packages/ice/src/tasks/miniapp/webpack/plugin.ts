import * as path from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import MiniPlugin from './plugins/MiniPlugin.js';
export class MiniWebpackPlugin {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  getPlugins() {
    const providerPlugin = this.getProviderPlugin();
    const definePlugin = this.getDefinePlugin();
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
      window: ['@ice/miniapp-runtime', 'window'],
      document: ['@ice/miniapp-runtime', 'document'],
      navigator: ['@ice/miniapp-runtime', 'navigator'],
      requestAnimationFrame: ['@ice/miniapp-runtime', 'requestAnimationFrame'],
      cancelAnimationFrame: ['@ice/miniapp-runtime', 'cancelAnimationFrame'],
      Element: ['@ice/miniapp-runtime', 'TaroElement'],
      SVGElement: ['@ice/miniapp-runtime', 'SVGElement'],
      MutationObserver: ['@ice/miniapp-runtime', 'MutationObserver'],
    });
  }

  getDefinePlugin() {
    const {
      env = {},
      runtime = {} as Record<string, boolean>,
      defineConstants = {},
    } = this.config;

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
    const { rootDir, outputDir, nodeModulesPath, template, deviceRatio, fileType, getAppConfig, getRoutesConfig } = this.config;
    const sourceDir = path.join(rootDir, 'src');
    const options = {
      /** paths */
      rootDir,
      sourceDir,
      outputDir,
      nodeModulesPath,
      /** config & message */
      fileType,
      template,
      commonChunks: ['runtime', 'vendors', 'taro', 'common', 'ice'],
      designWidth: 750,
      deviceRatio,
      baseLevel: 16,
      minifyXML: {},
      alias: {},
      constantsReplaceList: definePluginOptions,
      getAppConfig,
      getRoutesConfig,
    };
    return new MiniPlugin(options);
  }
}
