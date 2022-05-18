import path from 'path';
import type { Plugin } from 'esbuild';
import type { ExportsData } from '../service/preBundleDeps.js';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';

interface Options {
  flatIdDeps: Record<string, string>;
  flatIdToExports: Record<string, ExportsData>;
  rootDir: string;
}

const bundlePlugin = (options: Options): Plugin => {
  const { flatIdDeps, flatIdToExports, rootDir } = options;
  return {
    name: 'esbuild-dep-bundle',
    setup(build) {
      function resolveEntry(id: string) {
        const flatId = flattenId(id);
        if (flatId in flatIdDeps) {
          return {
            path: flatId,
            namespace: 'dep',
          };
        }
      }
      build.onResolve(
        { filter: /^[\w@][^:]/ },
        async ({ path: id, importer }) => {
          console.log('id ==>', id);
          if (id === 'stream') {
            return {
              path: '@ice/runtime/node/stream',
              external: true,
            };
          }
          // if this is an entry, return entry namespace resolve result
          if (!importer) {
            return resolveEntry(id);
          }
        },
      );

      build.onLoad({ filter: /.*/, namespace: 'dep' }, ({ path: id }) => {
        const entryFilePath = flatIdDeps[id];
        let relativePath = formatPath(path.relative(rootDir, entryFilePath));
        if (
          !relativePath.startsWith('./') &&
          !relativePath.startsWith('../') &&
          relativePath !== '.'
        ) {
          relativePath = `./${relativePath}`;
        }

        let contents = '';
        const exportsData = flatIdToExports[id];
        const [imports, exports] = exportsData;
        if (!imports.length && !exports.length) {
          // cjs
          contents += `export default require('${relativePath}');`;
        } else {
          // esm
          if (exports.includes('default')) {
            contents += `import d from '${relativePath}';export default d;`;
          }
          if (
            exportsData.hasReExports ||
            exports.length > 1 ||
            exports[0] !== 'default'
          ) {
            contents += `\nexport * from '${relativePath}';`;
          }
        }

        return {
          loader: 'js',
          contents,
          resolveDir: rootDir,
        };
      });
    },
  };
};

export default bundlePlugin;
