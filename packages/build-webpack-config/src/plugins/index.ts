import swcPlugin from './swc.js';
import type { Config } from '@ice/types';
import type { UnpluginOptions } from 'unplugin';

const getTransformPlugins = (rootDir: string, config: Config): UnpluginOptions[] => {
  const { sourceMap, transformPlugins = [], transforms = [] } = config;
  return [
    swcPlugin({ rootDir, sourceMap }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
