import * as path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: '@ice/plugin-keep-alive',
  setup: ({ generator }) => {
    generator.addExport({
      specifier: [
        'withActivation',
        'fixContext',
        'useActivate',
        'useUnactivate',
        'createContext',
        'withAliveScope',
        'useAliveController',
        'KeepAlive',
        'NodeKey',
      ],
      source: '@ice/plugin-keep-alive/api',
      type: false,
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime.js'),
});

export default plugin;
