import { defineConfig } from '@ice/app';

export default defineConfig({
  minify: false,
  publicPath: '/',
  define: {
    HAHA: JSON.stringify(true),
    'process.env.HAHA': JSON.stringify(true),
  },
  dropLogLevel: 'warn',
  plugins: ['@ice/plugin-icestark'],
  eslint: true,
  ssg: false,
  ssr: false,
});