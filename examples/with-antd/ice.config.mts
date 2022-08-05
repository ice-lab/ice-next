import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig({
  ssg: false,
  ssr: false,
  plugins: [antd({
    dark: true,
    compact: true,
    theme: {
      'blue-base': '#fd8',
    },
  })],
});
