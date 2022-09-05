import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import auth from '@ice/plugin-auth';

export default defineConfig({
  publicPath: '/',
  syntaxFeatures: {
    exportDefaultFrom: true,
  },
  define: {
    HAHA: JSON.stringify(true),
    'process.env.HAHA': JSON.stringify(true),
  },
  transform: (code, id) => {
    return id.includes('src/pages') && id.endsWith('.js') ? code : null;
  },
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: 'warn',
  plugins: [
    auth(),
    {
      name: 'runtime-donot-exsist',
      setup() {},
      runtime: './test',
    }
  ],
  eslint: true,
});
