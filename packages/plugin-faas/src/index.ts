import path from 'path';
import fse from 'fs-extra';
import type { Plugin } from '@ice/types';
import type { RequestHandler } from 'express';
import { matchRoutes } from '@ice/runtime';
import type { RouteItem } from '@ice/runtime/esm/types';
import { createExpressDevPack } from '@midwayjs/dev-pack';

const plugin: Plugin = async ({ onGetConfig, context }) => {
  const { rootDir } = context;
  const routeManifestPath = path.join(rootDir, '.ice/route-manifest.json');
  const serverEntryPath = path.join(rootDir, 'build', 'server', 'index.mjs');
  const { middleware } = await createExpressDevPack({
    watch: true,
    cwd: rootDir,
    sourceDir: 'src/api',
  });

  onGetConfig(async (config) => {
    const { middlewares: originSetupMiddlewares } = config;
    config.middlewares = (webpackMiddlewares, devServer) => {
      const middlewares = originSetupMiddlewares(webpackMiddlewares, devServer);
      const routes = fse.readJSONSync(routeManifestPath, 'utf8') as RouteItem[];

      const faasMiddlewares = [
        {
          name: 'faas-api-middleware',
          middleware,
        },
        {
          name: 'faas-render-middleware',
          middleware: createFaaSRenderMiddleware(
            (req) => {
              const matches = matchRoutes(routes, req.path);
              return !!matches.length;
            },
            serverEntryPath,
          ),
        },
      ];
      const serverRenderMiddlewareIndex = middlewares.findIndex(middleware => middleware.name === 'ice-server-render');
      if (serverRenderMiddlewareIndex > -1) {
        // use faas render instead of default server render
        middlewares.splice(serverRenderMiddlewareIndex, 1, ...faasMiddlewares);
      } else {
        middlewares.unshift(...faasMiddlewares);
      }

      return middlewares;
    };

    return config;
  });
};

function createFaaSRenderMiddleware(
  callback: (req: any) => boolean,
  serverEntryPath: string,
): RequestHandler {
  return async function (req, res, next) {
    if (callback(req)) {
      const serverEntry = await import(serverEntryPath);
      const requestContext = { req, res };
      const result = await serverEntry.renderToHTML(requestContext, false);
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.end(result.value);
    } else {
      next();
    }
  };
}

export default plugin;
