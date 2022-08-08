import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import Browser from '../utils/browser';
import type { Page } from '../utils/browser';

const example = 'hash-router';

describe(`build ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    await buildFixture(example);
    const res = await setupBrowser({ example });
    page = res.page as Page;
    browser = res.browser;
    expect((await page.content()).includes('<div id="ice-container"></div>')).toBeTruthy();
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page;
  let browser: Browser;

  test('open /', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h1')).toStrictEqual(['Layout']);
    expect(await page.$$text('h2')).toStrictEqual(['Home']);
  }, 120000);
});
