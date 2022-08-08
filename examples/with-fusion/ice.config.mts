import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig({
  plugins: [fusion({
    theme: {
      'primary-color': '#89d',
    },
  })],
});
