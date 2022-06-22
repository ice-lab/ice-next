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
    // To avoid error `Segmentation fault (core dumped)` in CI environment, disable threads
    // ref: https://github.com/vitest-dev/vitest/issues/317
    threads: false,
    exclude: [
      '**/node_modules/**',
      '**/esm/**',
      '**/tests/fixtures/**',
    ],
    coverage: {
      reporter: ['cobertura'],
      include: ['**/packages/**'],
      exclude: [
        '**/bundles/compiled/**',
        '**/tests/**',
      ],
    },
  },
});
