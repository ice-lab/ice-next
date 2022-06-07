import { defineConfig } from '@ice/app';

export default defineConfig({
  ssr: {
    bundle: false,
    format: 'cjs',
  },
});
