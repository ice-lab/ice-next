import { defineAppConfig } from 'ice';
import { defineStoreConfig } from '@ice/plugin-store/esm/types';

export const store = defineStoreConfig(async () => {
  // fetch Data
  return {
    initialStates: {
      user: {
        name: 'ICE 3',
      },
    },
  };
});

export default defineAppConfig({});
