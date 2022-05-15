import type { Plugin } from 'esbuild';

interface Options {

}

const bundlePlugin = (options: Options): Plugin => {
  return {
    name: 'esbuild-dep-bundle',
    setup(build) {

    },
  };
};

export default bundlePlugin;
