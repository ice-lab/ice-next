import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import * as fs from 'fs';
import consola from 'consola';
import esbuild, { type BuildOptions } from 'esbuild';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import stylePlugin from '../esbuild/style.js';
import aliasPlugin from '../esbuild/alias.js';
import createAssetsPlugin from '../esbuild/assets.js';
import { ASSETS_MANIFEST } from '../constant.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
}

type CompilerOptions = Pick<BuildOptions, 'entryPoints' | 'outfile' | 'plugins' | 'bundle'>;

export function createServerCompiler(options: Options) {
  const { task, rootDir } = options;
  const transformPlugins = getCompilerPlugins(task.config, 'esbuild');
  const alias = (task.config?.alias || {}) as Record<string, string | false>;
  const assetsManifest = path.join(rootDir, ASSETS_MANIFEST);

  const serverCompiler: ServerCompiler = async (buildOptions: CompilerOptions) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const buildResult = await esbuild.build({
      bundle: true,
      format: 'esm',
      target: 'node12.19.0',
      ...buildOptions,
      define: {
        // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
        // in esm, this in the global should be undefined. Set the following config to avoid warning
        this: undefined,
        // TOOD: sync ice runtime env
        'process.env.ICE_RUNTIME_SERVER': 'true',
      },
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      plugins: [
        stylePlugin({
          extract: false,
          modules: {
            auto: (filePath) => /\.module\.\w+$/i.test(filePath),
            generateLocalIdentName: function (name: string, filename: string) {
              const hash = createHash('md4');
              hash.update(Buffer.from(filename + name, 'utf8'));
              return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
            },
          },
        }),
        aliasPlugin({
          alias,
          compileRegex: (task.config?.compileIncludes || []).map((includeRule) => {
            return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
          }),
        }),
        fs.existsSync(assetsManifest) && createAssetsPlugin(assetsManifest, rootDir),
        ...transformPlugins,
        ...(buildOptions.plugins || []),
      ].filter(Boolean),
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return serverCompiler;
}
