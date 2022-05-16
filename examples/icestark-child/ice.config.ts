import { defineConfig } from '@ice/app';

export default defineConfig({
  minify: false,
  publicPath: '/',
  define: {
    HAHA: JSON.stringify(true),
    'process.env.HAHA': JSON.stringify(true),
  },
  webpack: (webpackConfig) => {
    webpackConfig.output!.library = 'icestark-child';
    webpackConfig.output!.libraryTarget = 'umd';

    return webpackConfig;
  },
  dropLogLevel: 'warn',
  plugins: ['@ice/plugin-icestark'],
  eslint: true,
  ssg: false,
  ssr: false,
});