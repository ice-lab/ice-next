import { defineConfig } from '@ice/app';

export default defineConfig({
  alias: {
    components: './src/components',
  },
  sourceMap: false,
  miniapp: {
    nativeConfig: {
      appid: '2021000117649999',
    }
  }
});
