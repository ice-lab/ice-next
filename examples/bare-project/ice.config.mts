import { defineConfig } from '@ice/app';

export default defineConfig({
  alias: {
    components: './src/components',
  },
  // define: {
  //   ASSETS_VERSION: '0.1.0',
  // },
  // externals: {
  //   jquery: 'jQuery'
  // },
  // TODO:
  outputDir: 'build2',
  // TODO:
  // proxy: {}
  sourceMap: false,
  // eslint: false,
  webpack: (webpackConfig) => {
    // console.log("🚀 ~ file: ice.config.mts ~ line 25 ~ webpackConfig", webpackConfig)
    return webpackConfig;
  }
});
