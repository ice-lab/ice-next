import { expect, it, describe } from 'vitest';
import { hijackElementProps } from '../src/';

describe('hijack element', () => {
  it('hijackElementProps basic', () => {
    const props = hijackElementProps({ data: '', number: 1, fontSize: '12rpx' });
    expect(props).toBe({
      data: '', number: 1, fontSize: '12rpx',
    });
  });

  it('hijackElementProps style', () => {
    const props = hijackElementProps({ style: { fontSize: 14, height: '12px', with: '12rpx' }});
    expect(props).toBe({
      style: {
        fontSize: 14,
        height: '12px',
        with: '1.6vw',
      }
    });
  });
});