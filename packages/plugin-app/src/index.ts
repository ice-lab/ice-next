import * as path from 'path';
import * as fs from 'fs';
import { createRequire } from 'module';

import type { Plugin } from '@ice/types';
import { setupServerRender } from './ssr/server.js';
import { buildEntry } from './ssr/build.js';

const require = createRequire(import.meta.url);

const plugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';

  // mock routeManifest
  const routeManifest = {
    '/': '/src/pages/index',
  };

  onHook(`before.${command as 'start' | 'build'}.run`, async ({ transformPlugins, config }) => {
    // TODO: watch file changes and rebuild
    await buildEntry({
      rootDir,
      outdir: 'build',
      entry: path.join(rootDir, '.ice/server.tsx'),
      // alias will be formatted as Record<string, string>
      // TODO consider with alias to false
      alias: (Array.isArray(config) ? config[0] : config).resolve?.alias as Record<string, string>,
      plugins: transformPlugins,
    });

    if (command === 'build') {
      // generator html to outputDir
      const serverRender = require(path.resolve(rootDir, 'build/server.js'));
      const html = await serverRender.default({});
      fs.writeFileSync(path.join(rootDir, 'build/index.html'), html);
    }
  });

  registerTask('web', {
    mode,
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.push({
        name: 'server-render',
        middleware: setupServerRender({
          rootDir,
          routeManifest,
        }),
      });

      return middlewares;
    },
   });
};

export default plugin;