import crypto from 'crypto';
import type webpack from 'webpack';
import type { PathData } from 'webpack';

interface TestModule {
  size: Function;
  nameForCondition: Function;
}
interface NameModule {
  libIdent?: Function;
  type: string;
  updateHash: (hash: crypto.Hash) => void;
}

export const FRAMEWORK_BUNDLES = [
  // runtime dependencies
  'react', 'react-dom', '@ice/runtime', 'react-router', 'react-router-dom',
];


const isModuleCSS = (module: { type: string }): boolean => {
  return (
    // mini-css-extract-plugin
    module.type === 'css/mini-extract' ||
    // extract-css-chunks-webpack-plugin
    module.type === 'css/extract-css-chunks'
  );
};
const getSplitChunksConfig = (rootDir: string): webpack.Configuration['optimization']['splitChunks'] => {
  const frameworkRegex = new RegExp(`[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join('|')})[\\\\/]`);
  return {
    chunks: 'all',
    cacheGroups: {
      framework: {
        chunks: 'all',
        name: 'framework',
        test(module: TestModule) {
          const resource = module.nameForCondition && module.nameForCondition();
          if (!resource) {
            return false;
          }
          return frameworkRegex.test(resource);
        },
        priority: 40,
        enforce: true,
      },
      lib: {
        test(module: TestModule) {
          return module.size() > 160000 && /node_modules[/\\]/.test(module.nameForCondition() || '');
        },
        name(module: NameModule) {
          const hash = crypto.createHash('sha1');
          if (isModuleCSS(module)) {
            module.updateHash(hash);
          } else {
            if (!module.libIdent) {
              throw new Error(
                `Encountered unknown module type: ${module.type}.`,
              );
            }
            hash.update(module.libIdent({ context: rootDir }));
          }
          return hash.digest('hex').substring(0, 8);
        },
      },
      // `defaultVendors` is a built-in cache group that created by webpack, all vendors
      // that are not matched by other cache groups will be fallback into this cache group.
      defaultVendors: {
        filename(pathData: PathData) {
          // @NOTE: To solve the dev server entry request contains port that cause hash difference.
          // Maybe there is a better way to solve this problem.
          if (/ice_bundles_compiled_webpack_hot_dev-server_js/.test(String(pathData.chunk.id))) {
            return 'ice-auto-refresh.js';
          } else {
            return '[id].js';
          }
        },
      },
    },
    maxInitialRequests: 25,
    minSize: 20000,
  };
};

export default getSplitChunksConfig;
