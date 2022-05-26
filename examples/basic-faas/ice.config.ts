import { defineConfig } from '@ice/app';
import { ServerlessBundlerPlugin } from '@midwayjs/hooks-bundler';
import pluginFaas from '@ice/plugin-faas';

export default defineConfig({
  plugins: [pluginFaas()],
  webpack(config) {
    config.plugins?.push(ServerlessBundlerPlugin.webpack());
    return config;
  },
});
