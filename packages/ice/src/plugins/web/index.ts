import * as path from 'path';
import type { Plugin } from '@ice/types';
import emptyDir from '../../utils/emptyDir.js';
import openBrowser from '../../utils/openBrowser.js';
import createAssetsPlugin from '../../esbuild/assets.js';
import generateHTML from './ssr/generateHTML.js';
import createServerRenderMiddleware from './ssr/createServerRenderMiddleware.js';
import createServerCompileMiddleware from './ssr/createServerCompileMiddleware.js';

const webPlugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir, userConfig, commandArgs } = context;
  const { ssg = true, ssr = true } = userConfig;
  const outputDir = path.join(rootDir, 'build');
  const routeManifest = path.join(rootDir, '.ice/route-manifest.json');
  const mode = command === 'start' ? 'development' : 'production';
  const assetsManifest = path.join(rootDir, '.ice/assets-manifest.json');
  const serverEntry = path.join(outputDir, 'server/index.mjs');
  let serverCompiler = async () => '';

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ esbuildCompile }) => {
    await emptyDir(outputDir);

    serverCompiler = async () => {
      await esbuildCompile({
        entryPoints: [path.join(rootDir, '.ice/entry.server')],
        outfile: serverEntry,
        // platform: 'node',
        format: 'esm',
        outExtension: { '.js': '.mjs' },
        plugins: [
          createAssetsPlugin(assetsManifest, rootDir),
        ],
      });
      // timestamp for disable import cache
      return `${serverEntry}?version=${new Date().getTime()}`;
    };
  });

  if (commandArgs.open) {
    onHook('after.start.compile', ({ urls, isFirstCompile }) => {
      if (!isFirstCompile) {
        return;
      }
      openBrowser(urls.localUrlForBrowser);
    });
  }

  onHook('after.build.compile', async () => {
    await serverCompiler();
    await generateHTML({
      outDir: outputDir,
      entry: serverEntry,
      routeManifest,
      ssg,
      ssr,
    });
  });

  registerTask('web', {
    sourceMap: command === 'start' ? 'cheap-module-source-map' : false,
    cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
    mode,
    outputDir,
    alias: {
      ice: path.join(rootDir, '.ice', 'index.ts'),
      '@': path.join(rootDir, 'src'),
    },
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const staticMiddlewaresIndex = middlewares.findIndex(({ name }) => name === 'express-static');
      middlewares.splice(
        staticMiddlewaresIndex + 1, 0,
        {
          name: 'server-entry-compile',
          middleware: createServerCompileMiddleware({ serverCompiler }),
        },
        {
          name: 'server-render',
          middleware: createServerRenderMiddleware({
            routeManifest,
            ssg,
            ssr,
          }),
        },
      );

      return middlewares;
    },
  });
};

export default webPlugin;
