import * as path from 'path';
import * as fse from 'fs-extra';
import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';
import { Compilation } from '@ice/bundles/compiled/webpack/index.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import keepPlatform from '../utils/keepPlatform.js';

const pluginName = 'DataLoaderPlugin';

export default class DataLoaderPlugin {
  private serverCompiler: ServerCompiler;
  private rootDir: string;
  public constructor(options: {
    serverCompiler: ServerCompiler;
    rootDir: string;
  }) {
    const { serverCompiler, rootDir } = options;
    this.serverCompiler = serverCompiler;
    this.rootDir = rootDir;
  }

  public apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap({
        name: pluginName,
        stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
      }, async () => {
        // Check file data-loader.ts if it is exists.
        const filePath = path.join(this.rootDir, RUNTIME_TMP_DIR, 'data-loader.ts');
        if (fse.existsSync(filePath)) {
          const {} = await this.serverCompiler({
            // Code will be transformed by @swc/core reset target to esnext make modern js syntax do not transformed.
            target: 'esnext',
          }, {
            swc: {
              removeExportExprs: ['default', 'getConfig', 'getServerData', 'getStaticData'],
              compilationConfig: {
                jsc: {
                  transform: {
                    constModules: {
                      globals: {
                        '@uni/env': keepPlatform('web'),
                        'universal-env': keepPlatform('web'),
                      },
                    },
                  },
                },
              },
            },
            preBundle: false,
          });
        } else {

        }
      });
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