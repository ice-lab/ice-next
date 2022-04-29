import * as fs from 'fs';
import type { IncomingMessage, ServerResponse } from 'http';
import { matchRoutes, ServerContext } from '@ice/runtime';

interface Options {
  routeManifest: string;
  serverCompiler: () => Promise<string>;
  ssg: boolean;
  ssr: boolean;
}

export function setupRenderServer(options: Options) {
  const {
    routeManifest,
    serverCompiler,
    ssg,
    ssr,
  } = options;

  return async (req: IncomingMessage, res: ServerResponse) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.url);
    if (matches.length === 0) return;

    const entry = await serverCompiler();
    const serverEntry = await import(entry);
    const serverContext: ServerContext = {
      req,
      res,
    };

    const documentOnly = !(ssg || ssr);
    serverEntry.renderToResponse(serverContext, documentOnly);
  };
}
