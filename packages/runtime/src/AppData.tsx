import * as React from 'react';
import type { AppExport, AppData, RequestContext } from './types.js';
import { loadDataByCustomFetcher } from './dataLoaderFetcher.js';

const Context = React.createContext<AppData | undefined>(undefined);

Context.displayName = 'AppDataContext';

function useAppData <T = AppData>(): T {
  const value = React.useContext(Context);
  return value;
}

const AppDataProvider = Context.Provider;

/**
 * Call the getData of app config.
 */
async function getAppData(appExport: AppExport, requestContext?: RequestContext): Promise<AppData> {
  const hasGlobalLoader = typeof window !== 'undefined' && (window as any).__ICE_DATA_LOADER__;
  const globalLoader = hasGlobalLoader ? (window as any).__ICE_DATA_LOADER__ : null;

  if (globalLoader && globalLoader.hasLoad('__app')) {
    return await globalLoader.getData('__app');
  }

  if (appExport?.dataLoader) {
    return await appExport.dataLoader(requestContext);
  }

  const loader = appExport?.dataLoader;

  if (Array.isArray(loader)) {
    return await Promise.all(loader.map(load => {
      if (typeof load === 'object') {
        return loadDataByCustomFetcher(load);
      }

      return load(requestContext);
    }));
  } else if (loader) {
    await loader(requestContext);
  }
}

export {
  getAppData,
  useAppData,
  AppDataProvider,
};
