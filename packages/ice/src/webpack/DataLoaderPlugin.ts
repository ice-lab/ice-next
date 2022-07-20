import * as path from 'path';
import fse from 'fs-extra';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Compiler } from 'webpack';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import keepPlatform from '../utils/keepPlatform.js';

const pluginName = 'DataLoaderPlugin';
const { RawSource } = webpack.sources;

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
      compilation.hooks.processAssets.tapAsync({
        name: pluginName,
        stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
      }, async (_, callback) => {
        // Check file data-loader.ts if it is exists.
        const filePath = path.join(this.rootDir, RUNTIME_TMP_DIR, 'data-loader.ts');
        if (fse.existsSync(filePath)) {
          const { outputFiles } = await this.serverCompiler({
            // Code will be transformed by @swc/core reset target to esnext make modern js syntax do not transformed.
            target: 'esnext',
            entryPoints: [filePath],
            write: false,
            inject: [],
            minify: process.env.NODE_ENV === 'production',
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
            externalDependencies: false,
          });
          compilation.emitAsset('js/data-loader.js', new RawSource(new TextDecoder('utf-8').decode(outputFiles[0].contents)));
        } else {
          compilation.deleteAsset('js/data-loader.js');
        }
        callback();
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