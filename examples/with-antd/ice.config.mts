import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';
import moment from '@ice/plugin-moment-locales';
import cssAssetsLocal from '@ice/plugin-css-assets-local';

export default defineConfig({
  plugins: [
    antd({
      importStyle: true,
      dark: true,
      compact: true,
      theme: {
        'blue-base': '#fd8',
      },
    }),
    moment({
      locales: ['zh-cn'],
    }),
    cssAssetsLocal(),
  ],
});
