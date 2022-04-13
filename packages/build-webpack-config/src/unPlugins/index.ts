import type { Config } from '@ice/types';
import type { UnpluginOptions } from 'unplugin';
import compilationPlugin from './compilation.js';

const getTransformPlugins = (rootDir: string, config: Config): UnpluginOptions[] => {
  const { sourceMap, transformPlugins = [], transforms = [], mode, compileIncludes } = config;
  const skipCompileDependencies = [
    // polyfill and helpers
    'core-js', 'core-js-pure', '@swc/helpers', '@babel/runtime',
    // built-in runtime
    'react', 'react-dom', 'react-router', 'react-router-dom',
    // dev dependencies
    '@pmmmwh/react-refresh-webpack-plugin', 'webpack', 'webpack-dev-server', 'react-refresh',
  ];

  // create regexp for ignore dependencies
  const compileExcludes = [new RegExp(skipCompileDependencies.map((dep) => `node_modules/?.+${dep}/`).join('|'))];

  return [
    compilationPlugin({ rootDir, sourceMap, mode, compileIncludes, compileExcludes }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
