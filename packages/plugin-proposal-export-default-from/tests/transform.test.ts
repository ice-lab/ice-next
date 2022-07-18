import { expect, it, describe } from 'vitest';
import transformPlugin from '../src/transform';

describe('transform proposal-export-default-from', () => {
  it('match js file', async () => {
    expect(transformPlugin({}).transformInclude('./test.css')).toBe(false);
    expect(transformPlugin({}).transformInclude('./test.scss')).toBe(false);
    expect(transformPlugin({}).transformInclude('./test.ts')).toBe(true);
    expect(transformPlugin({}).transformInclude('./test.tsx')).toBe(true);
    expect(transformPlugin({}).transformInclude('./test.js')).toBe(true);
    expect(transformPlugin({}).transformInclude('./test.jsx')).toBe(true);
    expect(transformPlugin({}).transformInclude('./test.mjs')).toBe(true);
  });

  it('export default from', async () => {
    const result = (await transformPlugin({}).transform(`export default from 'test';`, './test.js')).code;
    expect(result).toContain(`import _default from 'test';`);
  });

  it('without export default', async () => {
    const result = await transformPlugin({}).transform(`export default test;`, './test.js');
    expect(result).toBe(undefined);
  });
});