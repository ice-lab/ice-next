import * as path from 'path';
import * as fs from 'fs';
import { matchRoutes } from '@ice/runtime';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { Request, Response } from 'express';
import { ROUTER_MANIFEST, SERVER_ENTRY, SERVER_OUTPUT } from '../constant.js';

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
  documentOnly: boolean;
}

export default function createSSRMiddleware(options: Options) {
  const {
    rootDir,
    outputDir,
    serverCompiler,
    documentOnly,
  } = options;
  const ssrCompiler = async () => {
    const serverEntry = path.join(outputDir, SERVER_OUTPUT);
    await serverCompiler({
      entryPoints: [path.join(rootDir, SERVER_ENTRY)],
      outfile: serverEntry,
    });
    // timestamp for disable import cache
    return `${serverEntry}?version=${new Date().getTime()}`;
  };

  return {
    name: 'document-render-server',
    middleware: async (req: Request, res: Response) => {
      // Read the latest routes info.
      const routeManifest = path.join(rootDir, ROUTER_MANIFEST);
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
    },
  };
}
