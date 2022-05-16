import path from 'path';
import fse from 'fs-extra';
import type { Plugin, PluginBuild } from 'esbuild';

/**
 * re-export required route module exports, such as getConfig.
 */
export default function routeModulePlugin(
  config: {
    rootDir: string;
    exports: string[];
  },
  suffixMatcher: RegExp,
): Plugin {
  return {
    name: 'route-module',
    async setup(build: PluginBuild) {
      const { exports, rootDir } = config;

      const manifestPath = path.join(rootDir, '.ice/route-manifest.json');
      const routeManifest = fse.readJSONSync(manifestPath);

      // map routes info by file.
      const routesByFile = Object.keys(routeManifest).reduce(
        (map, key) => {
          const route = routeManifest[key];
          const { file } = route;
          const fileExtname = path.extname(file);
          const componentFile = file.replace(new RegExp(`${fileExtname}$`), '');

          map.set(`@/pages/${componentFile}`, route);
          return map;
        },
        new Map(),
      );

      build.onResolve({ filter: suffixMatcher }, args => {
        return { path: args.path, namespace: 'route-module' };
      });

      build.onLoad(
        { filter: suffixMatcher, namespace: 'route-module' },
        async args => {
          const file = args.path.replace(suffixMatcher, '');

          const route = routesByFile.get(file);
          const routeExports = route.exports;

          let contents = '';

          if (exports.indexOf('*') > -1) {
            contents = `export {${routeExports.join(', ')}} from '${file}';`;
          } else {
            const specs = [];

            // filter exports exist in routes.
            exports.forEach(e => {
              if (routeExports.indexOf(e) > -1) {
                specs.push(e);
              }
            });

            // re-export
            if (specs.length > 0) {
              contents = `export {${specs.join(', ')}} from '${file}';`;
            }
          }

          return {
            contents,
            resolveDir: file,
            loader: 'js',
          };
        },
      );
    },
  };
}