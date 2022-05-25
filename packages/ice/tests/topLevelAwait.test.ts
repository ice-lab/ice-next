import { expect, it, describe } from 'vitest';
import topLevelAwait from '../src/utils/topLevelAwait';

describe('top level await transform', () => {
  it('import a from \'a\'', async () => {
    const code = await topLevelAwait('import a from \'a\'');
    expect(code).toBe(`const { default as a } = await import('a')`);
  });

  it('import \'a\'', async () => {
    const code = await topLevelAwait('import \'a\'');
    expect(code).toBe(`await import('a')`);
  });

  it('import { a } from \'a\'', async () => {
    const code = await topLevelAwait('import { a } from \'a\'');
    expect(code).toBe(`const { a } = await import('a')`);
  });

  it('import { a as b } from \'a\'', async () => {
    const code = await topLevelAwait('import { a as b } from \'a\'');
    expect(code).toBe(`const { a as b } = await import('a')`);
  });

  it('import { a, b } from \'a\'', async () => {
    const code = await topLevelAwait('import { a, b } from \'a\'');
    expect(code).toBe(`const { a,b } = await import('a')`);
  });

  it('import { a as c, b } from \'a\'', async () => {
    const code = await topLevelAwait('import { a as c, b } from \'a\'');
    expect(code).toBe(`const { a as c,b } = await import('a')`);
  });

  it('import * as a from \'a\'', async () => {
    const code = await topLevelAwait('import * as a from \'a\'');
    expect(code).toBe(`const a = await import('a')`);
  });

  it('import a, { b } from \'a\'', async () => {
    const code = await topLevelAwait('import a, { b } from \'a\'');
    expect(code).toBe(`const { default as a,b } = await import('a')`);
  });

  it('validate id', async () => {
    const code = await topLevelAwait('import a, { b } from \'a\'', (id) => false);
    expect(code).toBe(`import a, { b } from \'a\'`);
  });
});
