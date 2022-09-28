import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: '@ice/plugin-auth',
  setup: ({ onGetConfig }) => {
    onGetConfig(config => {
      const defineRoutes: typeof config.defineRoutesQueue[0] = (defineRoute, options) => {
        console.log(defineRoute, options);
      };

      config.defineRoutesQueue ??= [];
      config.defineRoutesQueue.push(defineRoutes);
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime', 'index.js'),
});

export default plugin;
