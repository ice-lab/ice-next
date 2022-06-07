import type { GetAppConfig } from 'ice';
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