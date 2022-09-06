import { expect, it, describe } from 'vitest';
import getAppConfig, { defineAppConfig } from '../src/appConfig.js';

describe('AppConfig', () => {
  it('getAppConfig', () => {
    const appConfig = getAppConfig({
      default: {
        app: {
          rootId: 'app',
        }
      },
      auth: {},
    })
    expect(appConfig).toBe({
      app: {
        rootId: 'app',
        strict: false,
      },
      router: {
        type: 'browser',
      },
      auth: {},
    });
  })

  it('defineAppConfig', () => {
    const appConfig = {};
    expect(defineAppConfig(appConfig)).toEqual(appConfig);
  });

  it('defineAppConfig fn', () => {
    const appConfig = {};
    expect(defineAppConfig(() => appConfig)).toEqual(appConfig);
  });
});
