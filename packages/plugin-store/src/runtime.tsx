import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { createStore } from '@ice/store';
import { PAGE_STORE_GET_STATE_NAME, PAGE_STORE_PROVIDER_NAME } from './constants.js';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ addWrapper, addProvider, useRouteModule }) => {
  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
    // Add app store Provider
    const StoreProvider: AppProvider = ({ children }) => {
      return (
        // TODO: initialState
        <appStore.Provider>
          {children}
        </appStore.Provider>
      );
    };
    addProvider(StoreProvider);
  }
  // page store
  const StoreProviderWrapper: RouteWrapper = ({ children }) => {
    const routeModule = useRouteModule();
    if (routeModule[PAGE_STORE_PROVIDER_NAME]) {
      const Provider = routeModule[PAGE_STORE_PROVIDER_NAME];
      const getState = routeModule[PAGE_STORE_GET_STATE_NAME];
      let initialStates;
      if (getState) {
        initialStates = getState();
      }
      return <Provider initialStates={initialStates}>{children}</Provider>;
    }
    return <>{children}</>;
  };

  addWrapper(StoreProviderWrapper, true);
};

export { createStore };
export default runtime;
