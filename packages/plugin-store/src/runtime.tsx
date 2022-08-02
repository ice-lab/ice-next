import * as React from 'react';
import type { RuntimePlugin, AppProvider } from '@ice/types';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ addProvider }) => {
  const StoreProvider: AppProvider = ({ children }) => {
    return (
      // TODO: initialState
      <appStore.Provider>
        {children}
      </appStore.Provider>
    );
  };

  if (appStore && Object.prototype.hasOwnProperty.call(appStore, 'Provider')) {
    addProvider(StoreProvider);
  }
};

export default runtime;
