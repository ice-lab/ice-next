import * as path from 'path';
import type { Config } from '@ice/types';

const getWebTask = ({ rootDir, command }): Config => {
  // basic task config of data-loader
  return {
    mode: command === 'start' ? 'development' : 'production',
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    outputDir: path.join(rootDir, 'build'),
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
    },
    entry: {
      'data-loader': path.join(rootDir, '.ice/data-loader'),
    },
    swcOptions: {
      removeExportExprs: ['default', 'getConfig'],
    },
  };
};

export default getWebTask;
