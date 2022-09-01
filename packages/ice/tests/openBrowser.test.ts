import { expect, it, describe } from 'vitest';
import * as path from 'path';
import openBrowser from '../src/utils/openBrowser';

describe('openBrowser in node', () => {
  it('open localhost', () => {
    process.env.BROWSER = 'none';
    const result = openBrowser('http://localhost/');
    expect(result).toBe(false);
  });

  it('open scripts', () => {
    process.env.BROWSER = 'js';
    const result = openBrowser('a.js');
    expect(result).toBe(true);
  });

  // TODO simulate open browser in node
});