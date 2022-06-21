import { defineAppConfig } from 'ice';
import { defineAuthConfig } from '@ice/plugin-auth/esm/runtime';

console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

export const auth = defineAuthConfig(() => {
  return {
    initialAuth: {
      admin: true,
    },
  };
});

export default defineAppConfig({});
