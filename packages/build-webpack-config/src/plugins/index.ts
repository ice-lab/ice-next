import swcPlugin from './swc.js';
import type { Config } from '@ice/types';
import type { UnpluginOptions } from 'unplugin';

const getTransformPlugins = (rootDir: string, config: Config): UnpluginOptions[] => {
  const { sourceMap, transformPlugins = [], transforms = [], mode, isServer } = config;
  return [
    swcPlugin({ rootDir, sourceMap, mode, isServer }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
