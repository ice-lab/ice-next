import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig({
  plugins: [antd({
    dark: true,
    compact: true,
    theme: {
      'blue-base': '#fd8',
    },
  })],
});
