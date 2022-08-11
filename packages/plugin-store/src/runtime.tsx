import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { createStore, createModel } from '@ice/store';
import { PAGE_STORE_INITIAL_STATES, PAGE_STORE_PROVIDER } from './constants.js';
import appStore from '$store';

interface StoreConfig {
  initialStates: Record<string, any>;
}

const runtime: RuntimePlugin = async ({ appContext, addWrapper, addProvider, useAppContext }) => {
  const { appExport } = appContext;
  const storeConfig: StoreConfig = (typeof appExport.store === 'function'
    ? (await appExport.store()) : appExport.store) || {};
  const { initialStates } = storeConfig;
  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
    // Add app store Provider
    const StoreProvider: AppProvider = ({ children }) => {
      return (
        <appStore.Provider initialStates={initialStates}>
          {children}
        </appStore.Provider>
      );
    };
    addProvider(StoreProvider);
  }
  // page store
  const StoreProviderWrapper: RouteWrapper = ({ children, routeId }) => {
    const { routeModules } = useAppContext();
    const routeModule = routeModules[routeId];
    if (routeModule[PAGE_STORE_PROVIDER]) {
      const Provider = routeModule[PAGE_STORE_PROVIDER];
      const initialStates = routeModule[PAGE_STORE_INITIAL_STATES];
      if (initialStates) {
        return <Provider initialStates={initialStates}>{children}</Provider>;
      }
      return <Provider>{children}</Provider>;
    }
    return <>{children}</>;
  };

  addWrapper(StoreProviderWrapper, true);
};


type Store = (() => Promise<StoreConfig>) | StoreConfig;

function defineStoreConfig(fn: Store) {
  return fn;
}

export {
  createStore,
  createModel,

  defineStoreConfig,
};

export default runtime;
