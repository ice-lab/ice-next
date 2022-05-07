import * as fs from 'fs';
import type { RequestHandler } from 'express';
import { ServerContext } from '@ice/runtime';
import matchRoutes from '../../../utils/matchRoutes.js';

interface Options {
  routeManifest: string;
  serverCompiler: () => Promise<string>;
  ssg: boolean;
  ssr: boolean;
}

export function setupRenderServer(options: Options): RequestHandler {
  const {
    routeManifest,
    serverCompiler,
    ssg,
    ssr,
  } = options;

  return async (req, res) => {
    // Read the latest routes info.
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.url);
    if (matches.length === 0) {
      // TODO: 需要有 log
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
