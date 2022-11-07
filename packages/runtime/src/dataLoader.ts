import type { DataLoader, DataLoaderConfig, RuntimeModules, AppExport, RuntimePlugin, CommonJsRuntime } from './types.js';
import getRequestContext from './requestContext.js';

type Loaders = Array<DataLoader> | DataLoader;
interface RouteIdToLoaders {
  [routeId: string]: Loaders;
}

interface Result {
  value: any;
  status: string;
}

export interface RouteIdToLoaderConfigs {
  [routeId: string]: DataLoaderConfig;
}

let routeIdToLoaders: RouteIdToLoaders;

const cache = new Map<string, Result>();

/**
 * Get cache id by route id and number.
 */
function getCacheId(routeId: string, number?: Number) {
  return number ? `${routeId}-${number}` : routeId;
}

/**
 * Load data by route id and set to cache.
 */
function loadDataByRouteId(routeId: string) {
  // Try get data from ssr.
  if (typeof window !== 'undefined') {
    const context = (window as any).__ICE_APP_CONTEXT__ || {};
    const routesData = context.routesData || {};

    const dataFromSSR = routesData[routeId];
    if (dataFromSSR) {
      cache.set(routeId, {
        value: dataFromSSR,
        status: 'RESOLVED',
      });

      return dataFromSSR;
    }
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
}

/**
 * Load data from cache or fetch it.
 */
function loadData() {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];

  matchedIds.forEach(routeId => {
    loadDataByRouteId(routeId);
  });
}

/**
 * Get loaders by config of loaders.
 */
function getLoaders(loadersConfig: RouteIdToLoaderConfigs, dataLoaderFetcher: Function): RouteIdToLoaders {
  function getDataLoaderByConfig(config: DataLoaderConfig): DataLoader {
    // If dataLoader is an object, it is wrapped with a function.
    return typeof config === 'function' ? config : () => {
      return dataLoaderFetcher(config);
    };
  }

  const loaders: RouteIdToLoaders = {};

  Object.keys(loadersConfig).forEach(id => {
    const loaderConfig: DataLoaderConfig = loadersConfig[id];
    if (!loaderConfig) return;

    if (Array.isArray(loaderConfig)) {
      loaders[id] = loaderConfig.map((config: DataLoader) => {
        return getDataLoaderByConfig(config);
      });
    } else {
      loaders[id] = getDataLoaderByConfig(loaderConfig);
    }
  });

  return loaders;
}

function defaultDataLoaderFetcher(options: any) {
  return window.fetch(options.key, options);
}

export interface DataLoaderInitOptions {
  dataLoaderFetcher?: Function;
  needLoadData?: boolean;
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
function init(loaders: RouteIdToLoaderConfigs, options?: DataLoaderInitOptions) {
  const {
    dataLoaderFetcher = defaultDataLoaderFetcher,
    needLoadData = false,
    runtimeModules,
    appExport,
  } = options || {};

  if (routeIdToLoaders) return;

  routeIdToLoaders = getLoaders(loaders, dataLoaderFetcher);

  const runtimeApi = {
    appContext: {
      appExport,
    },
  };

  if (runtimeModules) {
    await Promise.all(runtimeModules.map(module => {
      const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
      return runtimeModule(runtimeApi);
    }).filter(Boolean));
  }

  if (needLoadData) {
    try {
      loadData();
    } catch (error) {
      console.error('Load initial data error: ', error);
    }
  }

  typeof window !== 'undefined' && ((window as any).__ICE_DATA_LOADER__ = async (routeId) => {
    return await loadDataByRouteId(routeId);
  });
}

export default {
  init,
  loadData,
  loadDataByRouteId,
};
