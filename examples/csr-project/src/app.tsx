import { defineAppConfig } from 'ice';
// @ts-expect-error
import { defineAuthConfig } from '@ice/plugin-auth/runtime/types';

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
