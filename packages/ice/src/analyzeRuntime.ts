import * as path from 'path';
import consola from 'consola';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import type { AppConfig } from './utils/runtimeEnv.js';

interface Options {
  esbuildCompile: EsbuildCompile;
  rootDir: string;
}

export const getAppConfig = async (options: Options): Promise<AppConfig> => {
  const { esbuildCompile, rootDir } = options;
  const outfile = path.join(rootDir, 'node_modules', 'entry.mjs');

  await esbuildCompile({
    // TODO: detect src/app if it is exists
    entryPoints: [path.join(rootDir, 'src/app')],
    outfile,
    format: 'esm',
  });

  const appConfig = (await import(outfile)).default;
  consola.debug('get app config by esbuild:', appConfig);
  return appConfig;
};
