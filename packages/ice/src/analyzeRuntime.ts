import * as path from 'path';
import consola from 'consola';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { AppConfig } from '@ice/types';

interface Options {
  serverCompiler: ServerCompiler;
  rootDir: string;
}

let appConfig: AppConfig;

export const getAppConfig = (): AppConfig => {
  return appConfig;
};

export async function compileAppConfig({ rootDir, serverCompiler }: Options) {
  const outfile = path.join(rootDir, 'node_modules', 'entry.mjs');
  const res = await serverCompiler({
    // TODO: detect src/app if it is exists
    entryPoints: [path.join(rootDir, 'src/app')],
    outfile,
    format: 'esm',
  });
  appConfig = (await import(outfile)).default;
  consola.debug('Compile app config by esbuild: ', appConfig, res);
  return appConfig;
}
