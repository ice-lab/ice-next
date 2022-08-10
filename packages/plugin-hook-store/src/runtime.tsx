import * as React from 'react';
import { createStore } from '@ice/hooks-store';
import type { RuntimePlugin, AppProvider } from '@ice/types';
import appStore from '$store';

const runtime: RuntimePlugin = async ({ addProvider }) => {
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
};

export { createStore };
export default runtime;
