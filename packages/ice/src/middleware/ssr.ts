import * as path from 'path';
import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { Request, Response } from 'express';

interface Options {
  rootDir: string;
  ssrCompiler: () => Promise<string>;
  documentOnly: boolean;
}

export function setupRenderServer(options: Options) {
  const {
    rootDir,
    ssrCompiler,
    documentOnly,
  } = options;

  return async (req: Request, res: Response) => {
    // Read the latest routes info.
    const routeManifest = path.join(rootDir, '.ice/route-manifest.json');
    const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));

    // If not match pages routes, hand over to webpack dev server for processing
    let matches = matchRoutes(routes, req.path);
    if (matches.length === 0) return;

    const entry = await ssrCompiler();
    const serverEntry = await import(entry);
    const requestContext = {
      req,
      res,
    };

    let html: string;
    if (documentOnly) {
      html = await serverEntry.renderDocument(requestContext);
    } else {
      html = await serverEntry.render(requestContext);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}
