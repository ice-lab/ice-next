import type { Plugin } from 'esbuild';
import type { DepsMetaData } from '../service/preBundleDeps.js';
import flattenId from '../utils/flattenId.js';

const bundlePlugin = (metadata: DepsMetaData): Plugin => {
  return {
    name: 'esbuild-dep-bundle',
    setup(build) {
      build.onResolve(
        { filter: /^[\w@][^:]/ },
        async ({ path: id, importer }) => {
          if (importer) {
            const flatId = flattenId(id);
            if (flatId in metadata.deps) {
              // redirect the dep path to the pre bundle path and external it
              return {
                path: metadata.deps[flatId].file,
                external: true,
              };
            }
          }
        },
      );
    },
  };
};

export default bundlePlugin;