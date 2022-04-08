import { defineAppConfig } from 'ice';

if (process.env.ICE_RUNTIME_ERROR_BOUNDARY) {
  console.log('__REMOVED__');
}

export default defineAppConfig({
  app: {},
});
