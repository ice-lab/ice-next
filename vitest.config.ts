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
    maxThreads: 3,
    exclude: [
      '**/node_modules/**',
      '**/esm/**',
      '**/tests/fixtures/**',
    ],
  },
});