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
    testTimeout: 200000,
    include: [
      './tests/integration/basic-project.test.ts',
      './tests/integration/routes-generate.test.ts',
    ],
    exclude: [
      '**/node_modules/**',
      '**/esm/**',
      '**/tests/fixtures/**',
    ],
  },
});
