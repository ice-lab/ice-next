import { defineConfig } from '@ice/app';
import pluginMiniapp from '@ice/plugin-miniapp';

export default defineConfig({
  ssg: false,
  hash: true,
  minify: true,
  dropLogLevel: 'trace',
  outputDir: 'build/wechat',
  alias: {
    components: './src/components',
  },
  // TODO:
  // proxy: {}
  sourceMap: false,
  plugins: [pluginMiniapp()],
  // eslint: false,
  define: {
    ASSETS_VERSION: '1.0.1'
  }
});
