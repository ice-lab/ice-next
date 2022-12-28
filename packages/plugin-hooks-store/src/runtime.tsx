import * as React from 'react';
import { createStore } from '@ice/hooks-store';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { PAGE_STORE_PROVIDER } from './constants.js';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ addProvider, useAppContext, addWrapper }) => {
  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
    // Add app store Provider
    const StoreProvider: AppProvider = ({ children }) => {
      return (
        // TODO: support initialStates: https://github.com/ice-lab/ice-next/issues/395#issuecomment-1210552931
        <appStore.Provider>
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
      return <Provider>{children}</Provider>;
    }
    return <>{children}</>;
  };

  addWrapper(StoreProviderWrapper, true);
};

export { createStore };
export default runtime;
