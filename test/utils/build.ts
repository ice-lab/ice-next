import * as path from 'path';
import * as process from 'process';
import getPort from 'get-port';
import Browser, { Page } from './browser';
import { getBuiltInPlugins } from '../../packages/ice/src/getBuiltInPlugins';
import createService from '../../packages/ice';

interface SetupBrowser {
  (options: {
    example: string;
    outputDir?: string;
    defaultHtml?: string;
  }): Promise<ReturnValue>;
}

interface ReturnValue {
  page: Page;
  browser: Browser;
}

// get builtIn plugins
export const buildFixture = function(example: string) {
  test(`setup ${example}`, async () => {
    const rootDir = path.join(__dirname, `../../examples/${example}`);
    process.env.DISABLE_FS_CACHE = 'true';
    const service = await createService({ rootDir, command: 'build', commandArgs: {}, getBuiltInPlugins });
    await service.run();
  }, 120000);
}

export const setupBrowser: SetupBrowser = async (options) => {
  const { example, outputDir = 'build', defaultHtml = 'index.html' } = options;
  const rootDir = path.join(__dirname, `../../examples/${example}`);
  const port = await getPort();
  const browser = new Browser({ cwd: path.join(rootDir, outputDir), port });
  await browser.start();
  const page = await browser.page(`http://127.0.0.1:${port}/${defaultHtml}`);
  return {
    browser,
    page,
  }
}
