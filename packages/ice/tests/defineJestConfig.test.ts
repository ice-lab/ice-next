import * as path from 'path';
import { fileURLToPath } from 'url';
import { expect, it, describe, vi, beforeAll } from 'vitest';
import { defineJestConfig } from '../src/test';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

describe('defineJestConfig', () => {
  beforeAll(() => {
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(path.join(__dirname, '../../../examples/with-jest'));
  });

  it('get default config with a param of an empty object', async () => {
    const jestConfigFn = defineJestConfig({});
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper']);
    expect(Object.keys(jestConfig.moduleNameMapper as Record<string, string>)).toStrictEqual(['^ice', '^@/(.*)', '^webpack/hot', '^regenerator-runtime']);
  });

  it('get default config with a param of a function with empty object', async () => {
    const jestConfigFn = defineJestConfig(async () => { return {}; });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper']);
    expect(Object.keys(jestConfig.moduleNameMapper as Record<string, string>)).toStrictEqual(['^ice', '^@/(.*)', '^webpack/hot', '^regenerator-runtime']);
  });

  it('get default config with custom config object', async () => {
    const jestConfigFn = defineJestConfig({ testTimeout: 12000 });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper', 'testTimeout']);
  });

  it('get default config with custom config function', async () => {
    const jestConfigFn = defineJestConfig(async () => { return { testTimeout: 12000 }; });
    const jestConfig = await jestConfigFn();
    expect(Object.keys(jestConfig)).toStrictEqual(['moduleNameMapper', 'testTimeout']);
  });
});
