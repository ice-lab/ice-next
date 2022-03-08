import consola from 'consola';
import esbuild, { type BuildOptions } from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';
import type { Config } from '@ice/types';

export function createEsbuildCompiler(options: {
  alias?: Record<string, string>;
  getTransformPlugins?: (config: Partial<Config>) => UnpluginOptions[];
}) {
  const { alias = {}, getTransformPlugins } = options;
  const aliasKey = Object.keys(alias);
  const resolveFilter = new RegExp(`^(${aliasKey.map((str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('|')})$`);
  return async (buildOptions: BuildOptions, customConfig?: Partial<Config>) => {
    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const transformPlugins = getTransformPlugins(customConfig);
    const buildResult = await esbuild.build({
      bundle: true,
      platform: 'node',
      external: ['./node_modules/*'],
      ...buildOptions,
      plugins: [
        {
          name: 'esbuild-alias',
          setup(build) {
            build.onResolve({ filter: resolveFilter }, (args) => ({
              path: alias[args.path],
            }));
          },
        },
        ...transformPlugins.map(plugin => createUnplugin(() => plugin).esbuild()),
      ],
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
}