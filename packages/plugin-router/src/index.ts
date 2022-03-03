import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ onGetConfig }) => {
<<<<<<< HEAD
  onGetConfig('web', (config) => {
    // config.mode = 'production';
    return config;
  });
=======
  // FIXME: types need to return config
  // onGetConfig('web', (config) => {
  //   config.mode = 'production';
  //   return config;
  // });
>>>>>>> release-next
};

export default plugin;