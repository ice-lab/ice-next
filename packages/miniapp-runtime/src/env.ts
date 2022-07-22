import { EMPTY_OBJ } from '@tarojs/shared';

import type { TaroDocument } from './dom/document.js';

interface Env {
  window;
  document: TaroDocument;
}

const env: Env = {
  window: EMPTY_OBJ,
  document: EMPTY_OBJ,
};

export default env;
