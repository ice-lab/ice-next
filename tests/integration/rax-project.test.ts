import { expect, test, describe, afterAll } from 'vitest';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const example = 'rax-project';

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect((await page.$$text('span'))[0]).toStrictEqual('Welcome to Your Rax App');
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
