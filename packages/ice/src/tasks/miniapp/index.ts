import * as path from 'path';
import type { Config } from '@ice/types';
import { CACHE_DIR } from '../../constant.js';
import { Template } from './webpack/wechat-template/index.js';
import getMiniappWebpackConfig from './webpack/index.js';

// Copied from webpack-config
function getEntry(rootDir: string) {
  // check entry.client.ts
  // let entryFile = fg.sync('entry.client.{tsx,ts,jsx.js}', {
  //   cwd: path.join(rootDir, 'src'),
  //   absolute: true,
  // })[0];
  let entryFile: string;
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, '.ice/entry.client.ts');
  }

  // const dataLoaderFile = path.join(rootDir, '.ice/data-loader.ts');
  return {
    main: entryFile,
    // FIXME: https://github.com/ice-lab/ice-next/issues/217, https://github.com/ice-lab/ice-next/issues/199
  };
}

const getMiniappTask = ({ rootDir, command }): Config => {
  // TODO: entry
  const entry = getEntry(rootDir);
  const outputDir = path.join(rootDir, 'build', 'ali-miniapp');
  const mode = command === 'start' ? 'development' : 'production';
  const template = new Template();
  const runtimePath = '@tarojs/plugin-platform-weapp/dist/runtime';
  const miniappWebpackConfig = getMiniappWebpackConfig({
    // TODO:
    rootDir,
    entry,
    outputDir,
    mode,
    template,
    runtimePath,
    globalObject: 'wx',
    fileType: {
      style: '.wxss',
      config: '.json',
      script: '.js',
      templ: '.wxml',
    },
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
  };
};

export default getMiniappTask;
