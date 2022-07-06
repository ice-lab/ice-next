import { createRequire } from 'module';
import fse from 'fs-extra';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
import consola from 'consola';
import { matchRoutes } from '@ice/runtime';
import type ServerCompilerTask from '../../utils/ServerCompilerTask.js';

const require = createRequire(import.meta.url);

interface Options {
  serverCompilerTask: ServerCompilerTask;
  routeManifestPath: string;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  basename?: string;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const { documentOnly, renderMode, serverCompilerTask, routeManifestPath, basename } = options;
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const routes = JSON.parse(fse.readFileSync(routeManifestPath, 'utf-8'));
    const matches = matchRoutes(routes, req.path, basename);
    if (matches.length) {
      // Wait for the server compilation to finish
      const { serverEntry } = await serverCompilerTask.get();

      let serverModule;
      try {
        delete require.cache[serverEntry];
        // timestamp for disable import cache
        const serverEntryWithVersion = `${serverEntry}?version=${new Date().getTime()}`;
        serverModule = await import(serverEntryWithVersion);
      } catch (err) {
        // make error clearly, notice typeof err === 'string'
        consola.error(`import ${serverEntry} error: ${err}`);
        return;
      }
      const requestContext: ServerContext = {
        req,
        res,
      };
      serverModule.renderToResponse(requestContext, {
        renderMode,
        documentOnly,
      });
    } else {
      next();
    }
  };

  return {
    name: 'server-render',
    middleware,
  };
}