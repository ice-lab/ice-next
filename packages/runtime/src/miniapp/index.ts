import { hooks } from '@tarojs/shared';

import * as taroHooks from './hooks.js';

hooks.tap('initNativeApi', (taro) => {
  for (const hook in taroHooks) {
    taro[hook] = taroHooks[hook];
  }
});

export * from './connect.js';
export * from './hooks.js';
