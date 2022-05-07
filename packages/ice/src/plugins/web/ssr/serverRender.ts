import type { RequestHandler } from 'express';
import { ServerContext } from '@ice/runtime';

interface Options {
  serverCompiler: () => Promise<string>;
  ssg: boolean;
  ssr: boolean;
}

export function setupRenderServer(options: Options): RequestHandler {
  const {
    serverCompiler,
    ssg,
    ssr,
  } = options;

  return async (req, res) => {
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
