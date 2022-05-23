import type { ExpressRequestHandler } from 'webpack-dev-server';

interface Options {
  ssg: boolean;
  ssr: boolean;
}

export default function createServerRenderMiddleware(options: Options): ExpressRequestHandler {
  const { ssg, ssr } = options;
  return async (req, res, next) => {
    // @ts-ignore
    const entry = req.serverEntry;
    let serverModule;
    if (entry) {
      try {
        serverModule = await import(entry);
      } catch (err) {
        // make error clearly, notice typeof err === 'string'
        res.end(`import ${entry} error: ${err}`);
        return;
      }

      const requestContext = {
        req,
        res,
      };
      const documentOnly = !(ssg || ssr);
      serverModule.renderToResponse(requestContext, documentOnly);
    } else {
      next();
    }
  };
}
