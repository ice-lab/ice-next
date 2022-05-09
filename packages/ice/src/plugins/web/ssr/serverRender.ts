import * as fs from 'fs';
import type { Request, Response, NextFunction } from 'express';
import type { ServerContext } from '@ice/runtime';
import matchRoutes from '../../../utils/matchRoutes.js';

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

  return async (req: Request, res: Response, next: NextFunction) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.url);
    if (matches.length === 0) {
      next();
      return;
    }

    const entry = await serverCompiler();

    let serverEntry;
    try {
      serverEntry = await import(entry);
    } catch (err) {
      // make error clearly, notice typeof err === 'string'
      res.end(`import ${entry} error: ${err}`);
      return;
    }

    const serverContext: ServerContext = {
      req,
      res,
    };

    const documentOnly = !(ssg || ssr);
    serverEntry.renderToResponse(serverContext, documentOnly);
  };
}
