import type { DataLoader, DataLoaderConfig } from '@ice/types';
import getRequestContext from './requestContext.js';

type Loaders = Array<DataLoader> | DataLoader;
interface RouteIdToLoaders {
  [routeId: string]: Loaders;
}

interface Result {
  value: any;
  status: string;
}

const cache = new Map<string, Result>();

/**
 * Get cache id by route id and number.
 */
function getCacheId(routeId: string, number?: Number) {
  return number ? `${routeId}-${number}` : routeId;
}

/**
 * Start getData once loader is ready, and set to cache.
 */
function loadInitialData(routeIdToLoaders: RouteIdToLoaders) {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];
  const routesData = context.routesData || {};

  matchedIds.forEach(routeId => {
    const dataFromSSR = routesData[routeId];
    if (dataFromSSR) {
      cache.set(routeId, {
        value: dataFromSSR,
        status: 'RESOLVED',
      });

      return dataFromSSR;
    }

    const requestContext = getRequestContext(window.location);
    function runLoaderSaveCache(loader?: DataLoader, index?: Number) {
      if (!loader) return;
      const chacheId = getCacheId(routeId, index);

      loader(requestContext).then(data => {
        cache.set(chacheId, {
          value: data,
          status: 'RESOLVED',
        });
        return data;
      }).catch(err => {
        cache.set(chacheId, {
          value: err,
          status: 'REJECTED',
        });
      });

      cache.set(chacheId, {
        value: loader,
        status: 'PENDING',
      });
    }

    const loaders: Loaders = routeIdToLoaders[routeId];

    if (Array.isArray(loaders)) {
      loaders.forEach(runLoaderSaveCache);
    } else {
      runLoaderSaveCache(loaders);
    }
  });
}

/**
 * Load data from cache or fetch it.
 */
async function load(routeId: string, loaders: Loaders) {
  const requestContext = getRequestContext(window.location);

  async function runLoaderGetFromCache(loader: DataLoader, index?: Number) {
    const cacheId = getCacheId(routeId, index);
    const result = cache.get(cacheId);

    // Get from cache first.
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

  if (Array.isArray(loaders)) {
    return await Promise.all(loaders.map(runLoaderGetFromCache));
  } else {
    return await runLoaderGetFromCache(loaders);
  }
}

/**
 * Get loaders by config of loaders.
 */
function getLoaders(loadersConfig: DataLoaderConfig, fetcher: Function): RouteIdToLoaders {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];

  function getDataLoaderByConfig(config): DataLoader {
    // If dataLoader is an object, it is wrapped with a function.
    return typeof config === 'function' ? config : () => {
      return fetcher(config);
    };
  }

  const loaders: RouteIdToLoaders = {};
  matchedIds.forEach(id => {
    const loaderConfig = loadersConfig[id];
    if (!loaderConfig) return;

    if (Array.isArray(loaderConfig)) {
      loaders[id] = loaderConfig.map((config: DataLoader) => {
        return getDataLoaderByConfig(config);
      });
    } else {
      loaders[id] = getDataLoaderByConfig(loaderConfig[id]);
    }
  });

  return loaders;
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
function init(loadersConfig: DataLoaderConfig, fetcher: Function) {
  const routeIdToLoaders: RouteIdToLoaders = getLoaders(loadersConfig, fetcher);

  try {
    loadInitialData(routeIdToLoaders);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = async (routeId) => {
    const loader: Loaders = routeIdToLoaders[routeId];
    return await load(routeId, loader);
  };
}

export default {
  init,
};
