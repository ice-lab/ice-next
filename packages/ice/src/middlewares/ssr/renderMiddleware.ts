import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import { ServerContext } from '@ice/runtime';

interface Options {
  documentOnly: boolean;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const { documentOnly } = options;
  const middleware: ExpressRequestHandler = async function (req, res) {
    // @ts-ignore
    const { serverEntry } = req;
    let serverModule;
    try {
      serverModule = await import(serverEntry);
    } catch (err) {
      // make error clearly, notice typeof err === 'string'
      res.end(`import ${serverEntry} error: ${err}`);
      return;
    }
    const requestContext: ServerContext = {
      req,
      res,
    };
    serverModule.renderToResponse(requestContext, documentOnly);
  };

  return {
    name: 'server-render',
    middleware,
  };
}