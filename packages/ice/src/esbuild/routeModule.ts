import type { Plugin, PluginBuild } from 'esbuild';

/**
 * This plugin loads route modules for the server build, using module shims
 * that re-export only the route module exports that are safe for the server.
 */
export default function routeModulePlugin(
  config: any,
  suffixMatcher: RegExp,
): Plugin {
  return {
    name: 'route-module',
    async setup(build: PluginBuild) {
      build.onResolve({ filter: suffixMatcher }, args => {
        return { path: args.path, namespace: 'route-module' };
      });

      build.onLoad(
        { filter: suffixMatcher, namespace: 'route-module' },
        async args => {
          let file = args.path.replace(suffixMatcher, '');

          // TODO: get route module exports

          // let exports;
          // try {
          //   exports = (
          //     await getRouteModuleExports(config)
          //   ).filter(ex => !!browserSafeRouteExports[ex]);
          // } catch (error: any) {
          //   return {
          //     errors: [
          //       {
          //         text: error.message,
          //         pluginName: 'browser-route-module',
          //       },
          //     ],
          //   };
          // }

          const { exports } = config;

          const spec = exports.length > 0 ? `{ ${exports.join(', ')} }` : '*';
          let contents = `export ${spec} from '${file}';`;

          if (spec === '*') {
            contents += `\nexport { default } from '${file}'`;
          }

          // TODO: delete unused code.

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