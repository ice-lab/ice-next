import type { GetAppConfig } from 'ice';
import React from 'react';
import { StoreProvider } from './store';


export const getAppConfig: GetAppConfig = () => {
  return {
    app: {
      addProvider: ({ children }) => {
        return (
          <StoreProvider>
            {children}
          </StoreProvider>
        );
      },
    },
  };
};
