import transformPlugin from './transform.js';

const plugin = () => ({
  name: 'plugins-proposal-export-default-from',
  setup({ onGetConfig }) {
    onGetConfig(config => {
      config.transformPlugins.push(transformPlugin);
    });
  },
});

export default plugin;