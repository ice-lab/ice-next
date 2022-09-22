import { defineConfig } from '@ice/app';
import keepAlive from '@ice/plugin-keep-alive';

export default defineConfig({
  plugins: [
    keepAlive(),
  ],
});
