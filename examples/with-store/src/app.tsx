import { defineAppConfig } from 'ice';
import { defineStoreConfig } from '@ice/plugin-store/esm/types';

export const store = defineStoreConfig(async (appData) => {
  // fetch Data
  return {
    initialStates: {
      ...appData,
    },
  };
});

export const getAppData: GetAppData = () => {
  return new Promise((resolve) => {
    resolve({
      user: {
        name: 'icejs',
      },
    });
  });
};

export default defineAppConfig({});
