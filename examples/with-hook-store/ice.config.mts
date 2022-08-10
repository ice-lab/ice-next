import { defineConfig } from '@ice/app';
import store from '@ice/plugin-hook-store';

export default defineConfig({
  plugins: [
    store(),
  ],
});
