import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { buildFixture, setupBrowser } from '../utils/build';
import { startFixture, setupStartBrowser } from '../utils/start';
import { Page } from '../utils/browser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const example = 'basic-project';

describe(`build ${example}`, () => {
  let page: Page = null;
  let browser = null;

  buildFixture(example);

  test('open /', async () => {
    const res = await setupBrowser({ example });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
    const bundleContent = fs.readFileSync(path.join(__dirname, `../../examples/${example}/build/index.js`), 'utf-8');
    expect(bundleContent.includes('__REMOVED__')).toBe(false);
  });

  afterAll(async () => {
    await browser.close();
  });
});

describe(`start ${example}`, () => {
  let page: Page = null;
  let browser = null;

  test('setup devServer', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;
    expect(await page.$$text('h2')).toStrictEqual(['Home Page']);
  }, 120000);

  test('should update head during client routing', async () => {
    const { devServer, port } = await startFixture(example);
    const res = await setupStartBrowser({ server: devServer, port });
    page = res.page;
    browser = res.browser;

    expect(
      await page.$$eval(
        'meta[name="theme-color"]',
        (els) => {
          return els.map(el => el.getAttribute('content'))
        }
      )
    ).toStrictEqual(['#000']);

    await page.click('a[href="/about"]');

    expect(
      await page.$$eval(
        'meta[name="theme-color"]',
        (els) => {
          return els.map(el => el.getAttribute('content'))
        }
      )
    ).toStrictEqual(['#eee']);
  }, 120000);

  afterAll(async () => {
    await browser.close();
  });
});
