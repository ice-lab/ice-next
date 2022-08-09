import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import { createStore } from '@ice/store';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ addWrapper, addProvider, useRouteModule }) => {
  // app store
  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
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
    if (routeModule.Provider) {
      return <routeModule.Provider>{children}</routeModule.Provider>;
    }
    return <>{children}</>;
  };

  addWrapper(StoreProviderWrapper);
};

export { createStore };
export default runtime;
