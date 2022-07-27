import fs from 'fs';
import * as path from 'path';
import type { Plugin, PluginBuild, Loader } from 'esbuild';
import type { UnpluginOptions, UnpluginContext } from 'unplugin';

interface PluginOptions {
  plugins?: UnpluginOptions[];
  namespace?: string;
  filter?: RegExp;
}

const extToLoader: Record<string, Loader> = {
  '.js': 'js',
  '.mjs': 'js',
  '.cjs': 'js',
  '.jsx': 'jsx',
  '.ts': 'ts',
  '.cts': 'ts',
  '.mts': 'ts',
  '.tsx': 'tsx',
  '.css': 'css',
  '.less': 'css',
  '.stylus': 'css',
  '.scss': 'css',
  '.sass': 'css',
  '.json': 'json',
  '.txt': 'text',
};

export function guessLoader(id: string): Loader {
  return extToLoader[path.extname(id).toLowerCase()] || 'js';
}

/**
 * `load` and `transform` may return a sourcemap without toString and toUrl,
 * but esbuild needs them, we fix the two methods.
 */
export function fixSourceMap(map: any) {
  if (!('toString' in map)) {
    Object.defineProperty(map, 'toString', {
      enumerable: false,
      value: function toString() {
        return JSON.stringify(this);
      },
    });
  }
  if (!('toUrl' in map)) {
    Object.defineProperty(map, 'toUrl', {
      enumerable: false,
      value: function toUrl() {
        return `data:application/json;charset=utf-8;base64,${Buffer.from(this.toString()).toString('base64')}`;
      },
    });
  }
  return map;
}

const transformPipe = (options: PluginOptions = {}): Plugin => {
  return {
    name: 'esbuild-transform-pipe',
    setup(build: PluginBuild) {
      const { plugins = [], namespace = '', filter = /.*/ } = options;
      const errors = [];
      const warnings = [];

      // TODO: support unplugin context such as parse / emitFile
      const pluginContext: UnpluginContext = {
        error(message) { errors.push({ text: String(message) }); },
        warn(message) { warnings.push({ text: String(message) }); },
      };
      plugins.forEach(plugin => {
        // Call esbuild specific Logic like onResolve.
        plugin?.esbuild?.setup(build);
      });
      build.onLoad({ filter, namespace }, async (args) => {
        const id = args.path;
        // it is required to forward `resolveDir` for esbuild to find dependencies.
        const resolveDir = path.dirname(args.path);
        const sourceCode = await fs.promises.readFile(args.path, 'utf8');
        const loader = guessLoader(id);
        return await plugins.reduce(async (prevData, plugin) => {
          const { contents } = await prevData;
          const { transform, transformInclude } = plugin;
          if (!transformInclude || transformInclude?.(id)) {
            const result = await transform.call(pluginContext, contents, id);
            if (typeof result === 'string') {
              return { contents: result, resolveDir, loader };
            } else if (typeof result === 'object' && result !== null) {
              let { code, map } = result;
              if (map) {
                if (!map.sourcesContent || map.sourcesContent.length === 0) {
                  map.sourcesContent = [code];
                }
                map = fixSourceMap(map);
                code += `\n//# sourceMappingURL=${map.toUrl()}`;
              }
              return { contents: code, resolveDir, loader };
            }
          }
          return { contents, resolveDir, loader };
        }, Promise.resolve({ contents: sourceCode, resolveDir, loader }));
      });
    },
  };
};

export default transformPipe;