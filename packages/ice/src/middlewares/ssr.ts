import * as path from 'path';
import type { ServerContext } from '@ice/runtime';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import { WebpackConfig } from '@ice/webpack-config';
import { SERVER_ENTRY, SERVER_OUTPUT, SERVER_OUTPUT_DIR } from '../constant.js';
import { scanImports } from '../service/analyze.js';

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
  documentOnly: boolean;
  webpackConfigs: WebpackConfig[];
}

export default function createSSRMiddleware(options: Options) {
  const {
    rootDir,
    outputDir,
    serverCompiler,
    documentOnly,
    webpackConfigs,
  } = options;
  const ssrCompiler = async () => {
    const entryPoint = path.join(rootDir, SERVER_ENTRY);
    const serverEntry = path.join(outputDir, SERVER_OUTPUT);
    const deps = await scanImports([serverEntry], {
      alias: (webpackConfigs[0].resolve?.alias || {}) as Record<string, string | false>,
    });
    console.log('depImport', deps);
    await serverCompiler({
      entryPoints: { index: entryPoint },
      outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
      splitting: true,
    });
    // timestamp for disable import cache
    return `${serverEntry}?version=${new Date().getTime()}`;
  };

  const middleware: ExpressRequestHandler = async (req, res) => {
    const entry = await ssrCompiler();
    let serverModule;
    try {
      serverModule = await import(entry);
    } catch (err) {
      // make error clearly, notice typeof err === 'string'
      res.end(`import ${entry} error: ${err}`);
      return;
    }
    const requestContext: ServerContext = {
      req,
      res,
    };
    serverModule.renderToResponse(requestContext, documentOnly);
  };

  return {
    name: 'document-render-server',
    middleware,
  };
}
