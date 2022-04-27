import path from 'path';
import fs from 'fs';
import type { Plugin } from '@ice/types';
import type { Middleware, ExpressRequestHandler } from 'webpack-dev-server';
import type Server from 'webpack-dev-server';
import { matchRoutes } from '@ice/runtime';
import type { RouteItem } from '@ice/runtime/esm/types';

const plugin: Plugin = ({ onGetConfig, context }) => {
  const { rootDir } = context;
  const routeManifestPath = path.join(rootDir, '.ice/route-manifest.json');
  const serverEntryPath = path.join(rootDir, 'build', 'server', 'index.mjs');
  onGetConfig(async (config) => {
    const { middlewares: originSetupMiddlewares } = config;
    config.middlewares = (webpackMiddlewares: Middleware[], devServer: Server) => {
      const middlewares = originSetupMiddlewares(webpackMiddlewares, devServer);
      const routes = JSON.parse(fs.readFileSync(routeManifestPath, 'utf8')) as RouteItem[];

      middlewares.splice(1, 0,
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
        {
          name: 'faas-api-middleware',
          middleware: createFaaSAPIMiddleware(),
        },
      );
      return middlewares;
    };

    return config;
  });
};

function createFaaSRenderMiddleware(
  callback: (req: any) => boolean,
  serverEntryPath: string,
): ExpressRequestHandler {
  return async function (req, res, next) {
    if (callback(req)) {
      const serverEntry = await import(serverEntryPath);
      const requestContext = {
        req: {
          url: req.url,
          path: req.path,
        },
      };
      const { value: html } = await serverEntry.renderToHTML(requestContext, false);
      res.set('Content-Type', 'text/html');
      res.send(html);
    } else {
      next();
    }
  };
}

function createFaaSAPIMiddleware(): ExpressRequestHandler {
  return function (req, res, next) {
    if (req.path.startsWith('/api')) {
      res.json(['a', 'b']);
    } else {
      next();
    }
  };
}

export default plugin;