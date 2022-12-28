import { defineConfig } from '@ice/app';
import store from '@ice/plugin-hooks-store';

export default defineConfig({
  plugins: [
    store(),
  ],
});
