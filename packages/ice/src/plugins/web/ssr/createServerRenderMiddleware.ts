import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { ExpressRequestHandler } from 'webpack-dev-server';

interface Options {
  routeManifest: string;
  ssg: boolean;
  ssr: boolean;
}

export default function createServerRenderMiddleware(options: Options): ExpressRequestHandler {
  const { routeManifest, ssg, ssr } = options;

  return async (req, res, next) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (matches.length === 0) {
      next();
    } else {
      // @ts-ignore
      const entry = req.serverEntry;
      const serverEntry = await import(entry);
      const requestContext = {
        req,
        res,
      };

      const documentOnly = !(ssg || ssr);
      serverEntry.renderToResponse(requestContext, documentOnly);
    }
  };
}
