import type { GetData } from '@ice/types';
import getRequestContext from './requestContext.js';

interface Loaders {
  [routeId: string]: GetData;
}

interface Result {
  value: any;
  status: string;
}

const cache = new Map<string, Result>();

/**
 * Start getData once loader is ready, and set to cache.
 */
function loadInitialData(loaders: Loaders) {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];
  const routesData = context.routesData || {};

  matchedIds.forEach(id => {
    const dataFromSSR = routesData[id];
    if (dataFromSSR) {
      cache.set(id, {
        value: dataFromSSR,
        status: 'RESOLVED',
      });

      return dataFromSSR;
    }

    const getData = loaders[id];

    if (getData) {
      const requestContext = getRequestContext(window.location);

      const loader = getData(requestContext).then(data => {
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
async function load(id: string, loader: GetData) {
  if (!loader) {
    return null;
  }

  const result = cache.get(id);

  // get from cache first
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
    // if no cache, call the loader
    const requestContext = getRequestContext(window.location);
    return await loader(requestContext);
  }
}

/**
 * transform loaders.
 */
function transformLoaders(loaders: Loaders, fetcher: Function) {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];

  matchedIds.forEach(id => {
    // If getData is an object, it is wrapped with a function.
    loaders[id] = typeof loaders[id] === 'function' ? loaders[id] : () => {
      return fetcher(loaders[id]);
    };
  });
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
function init(loaders: Loaders, fetcher: Function) {
  transformLoaders(loaders, fetcher);

  try {
    loadInitialData(loaders);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = async (id) => {
    const loader = loaders[id];
    return await load(id, loader);
  };
}

export default {
  init,
};
