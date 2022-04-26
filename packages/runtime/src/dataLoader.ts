import type { GetData } from './types';
import getInitialContext from './initialContext.js';

interface Loaders {
  [routeId: string]: GetData;
}

interface Result {
  value: any;
  status: string;
}

const cache = new Map<string, Result>();

/**
 * getData and set to cache.
 */
function loadInitialData(loaders: Loaders) {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matches = context.matchedIds || [];

  matches.unshift('__app');

  matches.forEach(id => {
    const getData = loaders[id];
    if (getData) {
      const initialContext = getInitialContext(window.location);
      const loader = getData(initialContext).then(data => {
        cache.set(id, {
          value: data,
          status: 'RESOLVED',
        });
        return data;
      }).catch(err => {
        cache.set(id, {
          value: err,
          status: 'REJECTED',
        });
      });

      cache.set(id, {
        value: loader,
        status: 'PENDING',
      });
    }
  });
}

/**
 * getData from cache or run it.
 */
async function run(id: string, loader: GetData) {
  if (!loader) {
    return null;
  }

  const result = cache.get(id);

  if (result) {
    const { value, status } = result;

    if (status === 'RESOLVED') {
      return value;
    }

    if (status === 'REJECTED') {
      throw value;
    }

    // PENDING
    return await value;
  } else {
    const initialContext = getInitialContext(window.location);
    return await loader(initialContext);
  }
}

/**
 * Load initial data and register global loader.
 */
function init(loaders: Loaders) {
  try {
    loadInitialData(loaders);
  } catch (e) {
    console.error(e);
  }

  (window as any).__ICE_DATA_LOADER__ = async (id) => {
    const loader = loaders[id];
    return await run(id, loader);
  };
}

export default {
  init,
};
