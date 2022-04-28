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
    if (entry) {
      const serverEntry = await import(entry);
      const requestContext = {
        req,
        res,
      };

      const documentOnly = !(ssg || ssr);
      serverEntry.renderToResponse(requestContext, documentOnly);
    } else {
      next();
    }
  };
}
