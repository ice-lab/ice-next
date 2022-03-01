import swcPlugin from './swc.js';
import type { Config } from '@ice/types';

const getUnPlugins = (rootDir: string, config: Config) => {
  const { sourceMap, uniPlugins = [], transforms = [] } = config;
  return [
    swcPlugin({ rootDir, sourceMap }),
    ...uniPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getUnPlugins;
