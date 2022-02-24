import type { Plugin } from '@ice/types';
import { setupRenderServer } from './ssr/server';
import { buildServerEntry } from './ssr/build';

const plugin: Plugin = ({ registerTask, context, onHook }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';

  // mock routeManifest
  const routeManifest = {
    '/': '/src/pages/index',
  };

  onHook(`before.${command}.run`, async () => {
    // TODO: watch file changes and rebuild
    await buildServerEntry({
      rootDir,
    });
  });

  registerTask('web', {
    mode,
    middlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      middlewares.push({
        name: 'document-render-server',
        middleware: setupRenderServer({
          rootDir,
          routeManifest,
        }),
      });

      return middlewares;
    },
   });
};

export default plugin;