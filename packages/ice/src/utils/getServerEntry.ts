import * as path from 'path';
import fg from 'fast-glob';
import type { Config } from '@ice/types';
import type { TaskConfig } from 'build-scripts/lib/index.js';
import { SERVER_ENTRY } from '../constant.js';

export default function getServerEntry(rootDir: string, task: TaskConfig<Config>) {
  // check entry.server.ts
  let entryFile = fg.sync('entry.server.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = task.config.server.entry || path.join(rootDir, SERVER_ENTRY);
  }
  return entryFile;
}
