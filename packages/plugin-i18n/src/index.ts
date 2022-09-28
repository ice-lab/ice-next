import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: '@ice/plugin-auth',
  setup: (pluginAPI) => { },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime', 'index.js'),
});

export default plugin;
