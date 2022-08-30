import { noop } from '@ice/shared';

import type { Node } from '../../dom/node.js';
import type { MutationCallback, MutationObserverInit, MutationObserverImpl } from './implements.js';
import { recordMutation } from './implements.js';
import type { MutationRecord } from './record.js';
import { MutationRecordType } from './record.js';

export class MutationObserver {
  core: Pick<MutationObserverImpl, 'observe' | 'disconnect' | 'takeRecords'>;

  constructor(callback: MutationCallback) {
    this.core = {
      observe: noop,
      disconnect: noop,
      takeRecords: (noop as () => any),
    };
  }

  public observe(...args: [Node, MutationObserverInit?]) {
    this.core.observe(...args);
  }

  public disconnect() {
    this.core.disconnect();
  }

  public takeRecords() {
    return this.core.takeRecords();
  }

  static record(record: MutationRecord) {
    recordMutation(record);
  }
}

export {
  MutationRecordType,
};
