import type { Config } from '@ice/types';
import type { UnpluginOptions } from 'unplugin';
import compilationPlugin from './compilation.js';

const getTransformPlugins = (config: Config): UnpluginOptions[] => {
  const { sourceMap, transformPlugins = [], transforms = [], mode, compileIncludes } = config;
  return [
    compilationPlugin({ sourceMap, mode, compileIncludes }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
