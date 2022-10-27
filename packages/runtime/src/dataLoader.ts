import type { DataLoader } from '@ice/types';
import getRequestContext from './requestContext.js';

interface Loaders {
  [routeId: string]: Array<DataLoader> | DataLoader;
}

interface DataLoadersConfig {
  [routeId: string]: Array<DataLoader> | DataLoader;
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
 * Get loaders by config of loaders.
 */
function getLoaders(loadersConfig: DataLoadersConfig, fetcher: Function): Loaders {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];

  function getDataLoaderByConfig(config): DataLoader {
    // If dataLoader is an object, it is wrapped with a function.
    return typeof config === 'function' ? config : () => {
      return fetcher(config);
    };
  }

  const loaders: Loaders = {};
  matchedIds.forEach(id => {
    const loaderConfig = loadersConfig[id];
    if (!loaderConfig) return;

    if (Array.isArray(loaderConfig)) {
      loaders[id] = loaderConfig.map((config: DataLoader) => {
        return getDataLoaderByConfig(config);
      });
    } else {
      loaders[id] = getDataLoaderByConfig(loadersConfig[id]);
    }
  });

  return loaders;
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
function init(loadersConfig: DataLoadersConfig, fetcher: Function) {
  const loaders: Loaders = getLoaders(loadersConfig, fetcher);

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
