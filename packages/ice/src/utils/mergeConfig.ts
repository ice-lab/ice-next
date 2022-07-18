import type { Config } from '@ice/types';
import lodash from '@ice/bundles/compiled/lodash/index.js';
const { mergeWith } = lodash;

export default function mergeConfig(config: Config, customConfig: Partial<Config>): Config {
  return mergeWith(config, customConfig, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
}
