import * as path from 'path';
import type { Plugin } from '@ice/types';
import generateHTML from './ssr/generateHtml.js';
import { setupRenderServer } from './ssr/serverRender.js';

const webPlugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir, userConfig: buildConfig } = context;
  const outputDir = path.join(rootDir, 'build');
  const routeManifest = path.join(rootDir, '.ice/route-manifest.json');
  const serverEntry = path.join(outputDir, 'server/entry.mjs');
  let serverCompiler = async () => '';
  onHook(`before.${command as 'start' | 'build'}.run`, async ({ esbuildCompile }) => {
    serverCompiler = async () => {
      await esbuildCompile({
        entryPoints: [path.join(rootDir, '.ice/entry.server')],
        outdir: path.join(outputDir, 'server'),
        // platform: 'node',
        format: 'esm',
        outExtension: { '.js': '.mjs' },
      }, { isServer: true });
      // timestamp for disable import cache
      return `${serverEntry}?version=${new Date().getTime()}`;
    };
  });
  onHook('after.build.compile', async () => {
    await serverCompiler();
    await generateHTML({
      outDir: outputDir,
      entry: serverEntry,
      routeManifest,
      isSSG: buildConfig.isSSG,
    });
  });
  const mode = command === 'start' ? 'development' : 'production';
  registerTask('web', {
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
      middlewares.push({
        name: 'document-render-server',
        middleware: setupRenderServer({
          serverCompiler,
          routeManifest,
          isSSR: buildConfig.isSSR,
          isSSG: buildConfig.isSSG,
        }),
      });

      return middlewares;
    },
   });
};

export default webPlugin;
