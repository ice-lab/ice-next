import type { ExpressRequestHandler } from 'webpack-dev-server';

export default function createFallbackMiddleware(): ExpressRequestHandler {
  return async (req, res, next) => {
    // @ts-ignore
    const entry = req.serverEntry;
    const serverEntry = await import(entry);
    const requestContext = { req, res };
    const result = await serverEntry.renderToHTML(requestContext, false);
    const { statusCode } = result;
    res.statusCode = statusCode;
    if (statusCode === 404) {
      const requestContext = {
        req: {
          url: '/_404',
          path: '/_404',
        },
      };
      const result = await serverEntry.renderToHTML(requestContext, false);
      res.end(result.value);
    } else {
      res.end(result.value);
    }
  };
}
