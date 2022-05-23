import { defineConfig } from '@ice/app';
import { ServerlessBundlerPlugin } from '@midwayjs/hooks-bundler';

export default defineConfig({
  plugins: ['@ice/plugin-faas'],
  webpack(config) {
    config.plugins?.push(ServerlessBundlerPlugin.webpack());
    return config;
  },
});
