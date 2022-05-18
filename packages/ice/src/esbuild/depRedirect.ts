import type { Plugin } from 'esbuild';
import type { DepsMetaData } from '../service/preBundleDeps.js';

const createDepRedirectPlugin = (metadata: DepsMetaData): Plugin => {
  return {
    name: 'esbuild-dep-redirect',
    setup(build) {
      const { deps } = metadata;
      build.onResolve({ filter: /.*/ }, ({ path: id }) => {
        console.log('id: ', id);
        if (Object.keys(deps).includes(id)) {
          return {
            path: deps[id].file,
            external: true,
          };
        }
      });
    },
  };
};

export default createDepRedirectPlugin;
