import * as path from 'path';
import type { IPlugin } from 'build-scripts';
import render from './render';
import { ssrLoadModule } from './ssrModuleLoader';

const plugin: IPlugin = ({ context, onGetWebpackConfig }) => {
  const { command, rootDir } = context;

  // FIXME：路由 /index 没有被劫持
  const routes = [
    {
      path: '/',
      component: './src/pages/index',
    },
    {
      path: '/index',
      component: './src/pages/index',
    },
    {
      path: '/about',
      component: './src/pages/index',
    },
    {
      path: '/home',
      component: './src/pages/home',
    },
  ];

  if (command === 'start') {
    onGetWebpackConfig('web', (webpackConfig) => {
      webpackConfig.devServer.set('onAfterSetupMiddleware', (devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        routes.forEach((route) => {
          devServer.app.get(route.path, async (req, res) => {
            const sourcePath = path.join(rootDir, '/src/document/index.jsx');
            const { mod } = await ssrLoadModule(sourcePath);

            const Document = mod;

            const html = render(Document);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(html);
          });
        });
      });
    });
  }
};

export default plugin;
