import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { ExpressRequestHandler } from 'webpack-dev-server';

interface Options {
  routeManifest: string;
  serverCompiler: () => Promise<string>;
}

export default function createServerCompilerMiddleware(options: Options): ExpressRequestHandler {
  const { serverCompiler, routeManifest } = options;
  return async function (req, _, next) {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (matches.length === 0) {
      next();
    }
    const serverEntry = await serverCompiler();
    // @ts-ignore
    req.serverEntry = serverEntry;
    next();
  };
}
