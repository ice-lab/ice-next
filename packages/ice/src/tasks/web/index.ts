import * as path from 'path';
import type { Config } from '@ice/types';
import { CACHE_DIR, RUNTIME_TMP_DIR } from '../../constant.js';

const getWebTask = ({ rootDir, command }): Config => {
  // basic task config of web task
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir: path.join(rootDir, CACHE_DIR),
    outputDir: path.join(rootDir, 'build'),
    alias: {
      ice: path.join(rootDir, RUNTIME_TMP_DIR, 'index.ts'),
      '@': path.join(rootDir, 'src'),
      // set alias for webpack/hot while webpack has been prepacked
      'webpack/hot': '@ice/bundles/compiled/webpack/hot',
    },
    swcOptions: {
      // getData is built by data-loader
      removeExportExprs: ['getData', 'getServerData', 'getStaticData'],
    },
    assetsManifest: true,
    fastRefresh: command === 'start',
  };
};

export default getWebTask;
