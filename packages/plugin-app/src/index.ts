import * as path from 'path';
import getWebpackConfig from '@builder/webpack-config';
import type { IPlugin } from 'build-scripts';
import { handleRequest } from './dev/server';

const plugin: IPlugin = ({ registerTask, context }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';
  const webpackConfig = getWebpackConfig(mode);
  // set alias for webpack/hot while webpack has been prepacked
  webpackConfig.resolve.alias.set('webpack/hot', '@builder/pack/deps/webpack/hot');
  // TODO: remove after refactor
  webpackConfig.entry('index').add(path.join(rootDir, 'src/app'));
  webpackConfig.resolve.merge({
    fallback: {
      // add events fallback for webpack/hot/emitter
      events: require.resolve('events'),
    },
  });

  const mockRoutes = [
    {
      path: '/',
      component: './src/pages/index',
    },
  ];

  webpackConfig.devServer.set('onAfterSetupMiddleware', (devServer) => {
    if (!devServer) {
      throw new Error('webpack-dev-server is not defined');
    }

    mockRoutes.forEach((route) => {
      devServer.app.get(route.path, async (req, res) => {
        handleRequest(req, res, {
          rootDir: rootDir,
        });
      });
    });
  });

  registerTask('web', webpackConfig);
};

export default plugin;
