import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';

const pluginName = 'DataLoaderPlugin';

export default class DataLoaderPlugin {
  public constructor() {}

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap(pluginName, () => {
      // Check file data-loader.ts if it is exists.
    });
  }
}

// compilation.emitAsset(filename, source);
/* compiler.hooks.thisCompilation.tap(pluginName, function (compilation) {
  compilation.hooks.processAssets.tapAsync({
      name: pluginName,
      stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
  }, function (assets, hookCallback) {
      callback({
          compilation: compilation,
          assets: assets,
          callback: hookCallback,
      });
  });
}); */