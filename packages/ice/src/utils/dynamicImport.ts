import { pathToFileURL } from 'url';
import formatPath from './formatPath.js';

export default async function dynamicImport(filePath: string, timestamp?: boolean) {
  const isWin32 = process.platform === 'win32';
  let importPath = formatPath(filePath);

  if (isWin32) {
    // Compatible with win32 path which starts with unsupported url scheme such as `D:/xx/xx/index.mjs`
    const importUrl = pathToFileURL(importPath);
    if (timestamp) {
      importUrl.search = `t=${Date.now()}`;
    }
    importPath = importUrl.toString();
  } else if (timestamp) {
    importPath += `?t=${Date.now()}`;
  }
  return await import(importPath);
}