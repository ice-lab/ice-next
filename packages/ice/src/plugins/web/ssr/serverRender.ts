import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { ExpressRequestHandler } from 'webpack-dev-server';

interface Options {
  routeManifest: string;
  serverCompiler: () => Promise<string>;
  ssg: boolean;
  ssr: boolean;
}

export function setupRenderServer(options: Options): ExpressRequestHandler {
  const {
    routeManifest,
    serverCompiler,
    ssg,
    ssr,
  } = options;

  return async (req, res, next) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (matches.length === 0) {
      next();
    } else {
      const entry = await serverCompiler();
      // const serverEntry = await import(entry);
      // const requestContext = {
      //   req,
      //   res,
      // };

      // const documentOnly = !(ssg || ssr);
      // serverEntry.renderToResponse(requestContext, documentOnly);
      next();
    }
  };
}
