import * as path from 'path';
import fg from 'fast-glob';
import type { Config } from '@ice/types';
import { RUNTIME_TMP_DIR, CACHE_DIR } from '../../constant.js';
import getMiniappPlatformConfig from './platforms/index.js';
import getMiniappWebpackConfig from './webpack/index.js';

// The same as @ice/webpack-config
function getEntry(rootDir: string) {
  // check entry.client.ts
  let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, RUNTIME_TMP_DIR, 'entry.client.ts');
  }
  return {
    main: entryFile,
  };
}

const getMiniappTask = ({ rootDir, command, platform, getAppConfig, getRoutesConfig }): Config => {
  const entry = getEntry(rootDir);
  // TODO:不支持被用户修改
  const outputDir = path.join(rootDir, 'build', platform);
  const mode = command === 'start' ? 'development' : 'production';
  const { template, globalObject, fileType } = getMiniappPlatformConfig(platform);

  const miniappWebpackConfig = getMiniappWebpackConfig({
    rootDir,
    entry,
    outputDir,
    mode,
    template,
    globalObject,
    fileType,
    getAppConfig,
    getRoutesConfig,
  });
  return {
    mode,
    entry,
    output: miniappWebpackConfig.output,
    sourceMap: mode === 'development' ? 'cheap-module-source-map' : false,
    alias: miniappWebpackConfig.resolve.alias,
    cacheDir: path.join(rootDir, CACHE_DIR),
    outputDir,
    plugins: miniappWebpackConfig.plugins,
    loaders: miniappWebpackConfig.module.rules,
    optimization: miniappWebpackConfig.optimization,
    performance: miniappWebpackConfig.performance,
    devServer: {}, // No need to use devServer in miniapp
    swcOptions: {
      keepPlatform: 'miniapp',
      // getData is built by data-loader
      removeExportExprs: ['getServerData', 'getStaticData'],
    },
    cssFilename: `[name]${fileType.style}`,
    cssChunkFilename: `[name]${fileType.style}`,
  };
};

export default getMiniappTask;
