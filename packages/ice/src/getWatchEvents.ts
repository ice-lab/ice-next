import * as path from 'path';
import consola from 'consola';
import type { WatchEvent } from '@ice/types/esm/plugin.js';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import { generateRoutesInfo } from './routes.js';
import type Generator from './service/runtimeGenerator';

interface Options {
  targetDir: string;
  templateDir: string;
  generator: Generator;
  cache: Map<string, string>;
  ctx: Context<Config>;
}

const getWatchEvents = (options: Options): WatchEvent[] => {
  const { generator, targetDir, templateDir, cache, ctx } = options;
  const { userConfig: { routes: routesConfig }, configFile, rootDir } = ctx;
  const watchRoutes: WatchEvent = [
    /src\/pages\/?[\w*-:.$]+$/,
    (eventName: string) => {
      if (eventName === 'add' || eventName === 'unlink') {
        const routesRenderData = generateRoutesInfo(rootDir, routesConfig);
        const stringifiedData = JSON.stringify(routesRenderData);
        if (cache.get('routes') !== stringifiedData) {
          cache.set('routes', stringifiedData);
          consola.debug('[event]', `routes data regenerated: ${stringifiedData}`);
          generator.renderFile(
            path.join(templateDir, 'routes.ts.ejs'),
            path.join(rootDir, targetDir, 'routes.ts'),
            routesRenderData,
          );
          generator.renderFile(
            path.join(templateDir, 'route-manifest.json.ejs'),
            path.join(rootDir, targetDir, 'route-manifest.json'),
            routesRenderData,
          );
        }
      }
    },
  ];

  const watchGlobalStyle: WatchEvent = [
    /src\/global.(scss|less|css)/,
    (event: string, filePath: string) => {
      if (event === 'unlink' || event === 'add') {
        consola.debug('[event]', `style '${filePath}': ${event}`);
        // TODO render global style template
      }
    },
  ];

  const watchConfigFile: WatchEvent = [
    new RegExp(configFile as string),
    (event: string, filePath: string) => {
      if (event === 'change') {
        consola.warn(`Found a change in ${path.basename(filePath)}. Restart the dev server to see the changes in effect.`);
      }
    },
  ];

  return [watchConfigFile, watchRoutes, watchGlobalStyle];
};

export default getWatchEvents;
