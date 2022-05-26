import path from 'path';
import { ServerCompiler } from '@ice/types/esm/plugin';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import { SERVER_ENTRY, SERVER_OUTPUT, SERVER_OUTPUT_DIR } from '../../constant.js';

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
}

export default function createCompileMiddleware(options: Options): Middleware {
  const { rootDir, outputDir, serverCompiler } = options;
  const middleware: ExpressRequestHandler = async function (req, _, next) {
    const serverEntry = path.join(outputDir, SERVER_OUTPUT);
    await serverCompiler({
      entryPoints: { index: path.join(rootDir, SERVER_ENTRY) },
      outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
      splitting: true,
    });
    // @ts-ignore
    req.serverEntry = serverEntry;

    next();
  };

  return {
    name: 'server-compile',
    middleware,
  };
}