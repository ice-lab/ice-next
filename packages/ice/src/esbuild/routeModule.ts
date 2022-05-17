import path from 'path';
import fse from 'fs-extra';
import type { Plugin, PluginBuild } from 'esbuild';

/**
 * This plugin loads route modules for the server build, using module shims
 * that re-export only the route module exports that are safe for the server.
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
      const manifestPath = path.join(config.rootDir, '.ice/route-manifest.json');
      const routeManifest = fse.readJSONSync(manifestPath);

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

      const { exports } = config;

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
            const route = routesByFile.get(file);
            const routeExports = route.exports;

            const specs = [];
            // filter exports exist in routes.
            exports.forEach(e => {
              if (routeExports.indexOf(e) > -1) {
                specs.push(e);
              }
            });

            if (specs.length > 0) {
              contents = `export {${specs.join(', ')}} from '${file}';`;
            }

            // TODO: delete unused code.
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