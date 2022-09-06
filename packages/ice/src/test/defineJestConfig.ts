import type { Config } from 'jest';
import * as path from 'path';
import fse from 'fs-extra';
import createService from '../createService.js';
import test from '../commands/test.js';

export default function defineJestConfig(customConfig: Config = {}): () => Promise<Config> {
  return async () => {
    const rootDir = process.cwd();
    const { run } = await createService({
      rootDir,
      command: 'test',
      commandArgs: {},
    });
    const { taskConfigs } = (await run()) as ReturnType<typeof test>;
    const webTaskConfig = taskConfigs.find((taskConfig) => taskConfig.name === 'web');
    const moduleNameMapper = {};
    const { config: { alias = {} } } = webTaskConfig;
    for (const key in alias) {
      const aliasPath = alias[key];
      if (aliasPath === false) {
        continue
      }
      const isDir = path.isAbsolute(aliasPath) && fse.lstatSync(aliasPath).isDirectory();
      moduleNameMapper[`^${key}${isDir ? '/(.*)' : ''}`] = `${aliasPath}${isDir ? '/$1' : ''}`;
    }
    return {
      moduleNameMapper,
      ...customConfig,
    }
  }
}
