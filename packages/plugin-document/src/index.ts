import * as path from 'path';
import getWebpackConfig from '@builder/webpack-config';
import type { IPlugin } from 'build-scripts';

const plugin: IPlugin = ({ registerTask, context, onHook, onGetWebpackConfig }) => {
  // console.log('load document plugin');

  const { command, rootDir } = context;
  const mode = command === 'start' ? 'development' : 'production';
  
  // register document
  const webpackConfig = getWebpackConfig(mode);
  // set alias for webpack/hot while webpack has been prepacked
  webpackConfig.resolve.alias.set('webpack/hot', '@builder/pack/deps/webpack/hot');
  // TODO: remove after refactor
  webpackConfig.entry('document').add(path.join(rootDir, 'src/document'));
  webpackConfig.resolve.merge({
    fallback: {
      // add events fallback for webpack/hot/emitter
      events: require.resolve('events'),
    },
  });
  registerTask('document', webpackConfig);

  if ( command === 'start' ) {
    onGetWebpackConfig('web', (webpackConfig) => {
      webpackConfig.devServer.set('onAfterSetupMiddleware', (devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        devServer.app.get('/abc', function (req, res) {
          res.json({ custom: 'response' });
        });
      });
    });

    onHook('before.start.run', stats => {
      // console.log(stats.config);
      // do something after build
    });
  }
};

export default plugin;
