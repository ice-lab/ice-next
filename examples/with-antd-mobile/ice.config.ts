import { defineConfig } from '@ice/app';

export default defineConfig({
  ssr: {
    bundle: true,
    format: 'esm',
  },
});
