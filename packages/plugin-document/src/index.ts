import * as path from 'path';
import getWebpackConfig from '@builder/webpack-config';
import type { IPlugin } from 'build-scripts';
import render from './render';

const plugin: IPlugin = ({ registerTask, context, onGetWebpackConfig }) => {
  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';

  // register document entry
  const webpackConfig = getWebpackConfig(mode);

  webpackConfig.entry('document').add(path.join(rootDir, 'src/document'));

  webpackConfig.target('node');
  webpackConfig.output.library({ type: 'commonjs2' });
  webpackConfig.externals({
    react: 'commonjs2 react',
  });

  webpackConfig.merge({
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
    },
  });

  webpackConfig.devServer.hot(false);

  registerTask('document', webpackConfig);

  // 路由 /index 的 html 走到了默认逻辑
  const routes = [
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
          devServer.app.get(route.path, (req, res) => {
            // 如何保证每次都能取到最新的 document 产物
            const Document = require(path.join(rootDir, 'dist/document')).default;

            // 需要写入 bundle 信息
            const html = render(Document);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(html);
          });
        });
      });
    });

    // onHook('before.start.run', stats => {
    //   // console.log(stats.config);
    //   // do something after build
    // });
  }
};

export default plugin;
