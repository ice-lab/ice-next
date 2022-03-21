import * as path from 'path';
import { createRequire } from 'module';
import consola from 'consola';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';

const require = createRequire(import.meta.url);

interface Options {
  esbuildCompile: EsbuildCompile;
  rootDir: string;
}

export const getAppConfig = async (options: Options): Promise<void> => {
  const { esbuildCompile, rootDir } = options;
  const outfile = path.join(rootDir, 'node_modules', 'entry.js');
  try {
    await esbuildCompile({
      // TODO: detect src/app if it is exists
      entryPoints: [path.join(rootDir, 'src/app')],
      outfile,
      platform: 'node',
      external: ['./node_modules/*'],
    }, { isServer: true });

    const appConfig = require(outfile).default;
    consola.debug('app config:', appConfig);
    return appConfig;
  } catch (err) {
    consola.error('[ERROR]', 'Fail to analyze app config', err);
  }
};
