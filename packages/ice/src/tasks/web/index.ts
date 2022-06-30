import * as path from 'path';
import type { Config } from '@ice/types';
import { CACHE_DIR } from '../../constant.js';

const getWebTask = ({ rootDir, command }): Config => {
  // basic task config of web task
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDir: path.join(rootDir, CACHE_DIR),
    outputDir: path.join(rootDir, 'build'),
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
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
    // When build CSR  Bundle, set ssr and ssg env to false, for remove dead code.
    define: {
      'process.env.ICE_CORE_SSG': false,
      'process.env.ICE_CORE_SSR': false,
    },
  };
};

export default getWebTask;
