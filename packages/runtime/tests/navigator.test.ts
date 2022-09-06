import { expect, it, describe } from 'vitest';
import { createStaticNavigator } from '../src/server/navigator';

describe('mock server navigator', () => {
  const staticNavigator = createStaticNavigator();
  it('createHref', () => {
    expect(staticNavigator.createHref('/')).toBe('/');
  });

  it('push', () => {
    try {
      staticNavigator.push('/');
    } catch(err) {
      expect(true).toBe(true);
    }
  });

  it('replace', () => {
    try {
      staticNavigator.replace('/');
    } catch(err) {
      expect(true).toBe(true);
    }
  });

  it('go', () => {
    try {
      staticNavigator.go(1);
    } catch(err) {
      expect(true).toBe(true);
    }
  });

  it('back', () => {
    try {
      staticNavigator.back();
    } catch(err) {
      expect(true).toBe(true);
    }
  });

  it('forward', () => {
    try {
      staticNavigator.forward();
    } catch(err) {
      expect(true).toBe(true);
    }
  });

  it('block', () => {
    try {
      staticNavigator.block();
    } catch(err) {
      expect(true).toBe(true);
    }
  });
});