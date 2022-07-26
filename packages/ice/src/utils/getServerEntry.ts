import * as path from 'path';
import fg from 'fast-glob';
import { SERVER_ENTRY } from '../constant.js';

export default function getServerEntry(rootDir: string) {
  // check entry.server.ts
  let entryFile = fg.sync('entry.server.{tsx,ts,jsx.js}', {
    cwd: path.join(rootDir, 'src'),
    absolute: true,
  })[0];
  if (!entryFile) {
    // use generated file in template directory
    entryFile = path.join(rootDir, SERVER_ENTRY);
  }
  return entryFile;
}
