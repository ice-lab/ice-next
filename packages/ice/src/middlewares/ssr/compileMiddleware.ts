import path from 'path';
import { ServerCompiler } from '@ice/types/esm/plugin';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import consola from 'consola';
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
    try {
      await serverCompiler({
        entryPoints: { index: path.join(rootDir, SERVER_ENTRY) },
        outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
        splitting: true,
      });
      // @ts-ignore
      req.serverEntry = serverEntry;
    } catch (err) {
      consola.error(`fail to compile in ssr middleware: ${err}`);
    }

    next();
  };

  return {
    name: 'server-compile',
    middleware,
  };
}