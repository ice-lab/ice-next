import type { ExpressRequestHandler } from 'webpack-dev-server';

interface Options {
  serverCompiler: () => Promise<string>;
}

export default function createServerCompilerMiddleware(options: Options): ExpressRequestHandler {
  const { serverCompiler } = options;
  return async function (req, _, next) {
    const serverEntry = await serverCompiler();
    // @ts-ignore
    req.serverEntry = serverEntry;
    next();
  };
}
