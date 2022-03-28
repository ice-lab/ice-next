import path from 'path';
import type { Plugin, PluginBuild } from 'esbuild';
import fg from 'fast-glob';
import { resolveId } from '../service/analyze.js';

interface PluginOptions {
  alias: Record<string, string>;
}

const aliasPlugin = (options: PluginOptions): Plugin => {
  const { alias } = options;
  return {
    name: 'esbuild-alias',
    setup: async (build: PluginBuild) => {
      build.onResolve({ filter: /.*/ }, (args) => {
        const id = args.path;
        const resolved = resolveId(id, alias);
        if (resolved && resolved !== id) {
          if (!path.extname(resolved)) {
            const basename = path.basename(resolved);
            const patterns = [`${basename}.{js,ts,jsx,tsx}`, `${basename}/index.{js,ts,jsx,tsx}`];
            const absoluteId = fg.sync(patterns, {
              cwd: path.dirname(resolved),
              absolute: true,
            })[0];
            if (absoluteId) {
              return {
                path: absoluteId,
              };
            }
          }
        }
      });
    },
  };
};

export default aliasPlugin;
