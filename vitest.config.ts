import { defineConfig } from 'vitest/config';
import { getHookFiles } from './packages/ice/esm/requireHook.js';

const moduleNameMapper = getHookFiles().reduce((mapper, [id, value]) => {
  mapper[`^${id}$`] = value;
  return mapper;
}, {});

export default defineConfig({
  resolve: {
    alias: { ...moduleNameMapper },
  },
  test: {
    // To avoid error `Segmentation fault (core dumped)` in CI environment, must set the threads number
    // ref: https://github.com/vitest-dev/vitest/issues/317
    maxThreads: 3,
    minThreads: 1,
    exclude: [
      '**/node_modules/**',
      '**/esm/**',
      '**/tests/fixtures/**',
    ],
  },
});
