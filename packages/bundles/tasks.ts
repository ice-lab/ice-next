import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { packDependency } from '../../scripts/packDependencies';

// @ts-expect-error
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXTERNALS = {
  // don't bundle caniuse-lite data so users can
  // update it manually
  'caniuse-lite': 'caniuse-lite',
  '/caniuse-lite(/.*)/': 'caniuse-lite$1',
  chokidar: 'chokidar',
  fibers: 'fibers',
  sass: 'sass',
  less: 'less',
  typescript: 'typescript',
  postcss: 'postcss',
  '@swc/core': '@swc/core',
  'jest-worker': 'jest-worker',
  terser: 'terser',
  tapable: '@ice/bundles/compiled/tapable',
  cssnano: '@ice/bundles/compiled/cssnano',
  // depend by webpack
  'terser-webpack-plugin': '@ice/bundles/compiled/terser-webpack-plugin',
  webpack: '@ice/bundles/compiled/webpack',
  'schema-utils': '@ice/bundles/compiled/schema-utils',
  lodash: '@ice/bundles/compiled/lodash',
  'postcss-preset-env': '@ice/bundles/compiled/postcss-preset-env',
};

export function filterExternals(externals: Record<string, string>, keys: string[]) {
  const filterExternals = {};
  Object.keys(externals).forEach((externalKey) => {
    if (!keys.includes(externalKey)) {
      filterExternals[externalKey] = externals[externalKey];
    }
  });
  return filterExternals;
}

const tasks = [
  // simple task
  ...['cssnano', 'tapable', 'schema-utils', 'lodash',
    'less-loader', 'postcss-loader', 'sass-loader',
    'postcss-preset-env', 'postcss-nested', 'postcss-modules',
    'webpack-bundle-analyzer', 'es-module-lexer',
  ].map((pkgName) => ({ pkgName })),
  {
    pkgName: 'css-loader',
    patch: () => {
      const targetPath = path.join(__dirname, 'compiled/css-loader');
      ['api.js', 'sourceMaps.js', 'noSourceMaps.js', 'getUrl.js'].forEach((filename) => {
        // use ES Modules
        const targetFile = path.join(targetPath, filename);
        fs.writeFileSync(targetFile, fs.readFileSync(targetFile, 'utf-8').replace('module.exports =', 'export default'), 'utf-8');
      });
    },
  },
  {
    pkgName: 'css-minimizer-webpack-plugin',
    matchCopyFiles: (data: { resolvePath: string; resolveId: string }): boolean => {
      const { resolvePath, resolveId } = data;
      return resolvePath.endsWith('./utils') && resolveId.endsWith('css-minimizer-webpack-plugin/dist/index.js');
    },
  },
  {
    pkgName: 'terser-webpack-plugin',
    matchCopyFiles: (data: { resolvePath: string; resolveId: string }): boolean => {
      const { resolvePath, resolveId } = data;
      return resolvePath.endsWith('./utils') && resolveId.endsWith('terser-webpack-plugin/dist/index.js');
    },
  },
  {
    pkgName: 'mini-css-extract-plugin',
    patch: () => {
      // copy runtime files
      const pkgPath = path.join(__dirname, 'node_modules/mini-css-extract-plugin');
      const targetPath = path.join(__dirname, 'compiled/mini-css-extract-plugin');
      ['hmr', 'loader-options.json', 'utils.js'].forEach((file) => {
        fs.copySync(path.join(pkgPath, `dist/${file}`), path.join(targetPath, file));
      });
    },
  },
  {
    file: './webpack/bundle',
    pkgName: 'webpack',
    bundleName: 'bundle.js',
    externals: filterExternals(EXTERNALS, ['webpack']),
    minify: false,
    matchCopyFiles: (data: { resolvePath: string }): boolean => {
      const { resolvePath } = data;
      return resolvePath.endsWith('.runtime.js');
    },
    patch: () => {
      // copy packages
      const pkgPath = path.join(__dirname, 'node_modules/webpack');
      const targetPath = path.join(__dirname, 'compiled/webpack');
      fs.copySync(path.join(pkgPath, 'hot'), path.join(targetPath, 'hot'));
      fs.copySync(path.join(__dirname, 'webpack/packages'), targetPath);
    },
  },
];

(async () => {
  for (let task of tasks) {
    await packDependency({
      rootDir: __dirname,
      externals: EXTERNALS,
      target: `compiled/${task.pkgName}`,
      ...task,
    });
  }
})();
