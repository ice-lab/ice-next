import path from 'path';
import { resolve as resolveExports } from 'resolve.exports';
import fse from 'fs-extra';
import { transform, build } from 'esbuild';
import resolve from 'resolve';

interface PackageData {
  data: {
    name: string;
    type: string;
    version: string;
    main: string;
    module: string;
    exports: string | Record<string, any> | string[];
    dependencies: Record<string, string>;
    [field: string]: any;
  };
  dir: string;
}

export default async function preBundle(
  depsInfo: Record<string, string>,
  rootDir: string,
) {
  for (const depId in depsInfo) {
    const packageEntry = resolvePackageEntry(depId, rootDir);
    console.log('packageEntry==>', packageEntry);
  }
}

function resolvePackageEntry(depId: string, rootDir: string) {
  const { data: pkgJSONData, dir } = resolvePackageData(depId, rootDir);
  // resolve exports field
  let entryPoint = resolveExports(pkgJSONData, depId);
  if (!entryPoint) {
    entryPoint = pkgJSONData['module'] || pkgJSONData['main'];
  }
  const entryPointPath = path.join(dir, entryPoint);
  return entryPointPath;
}

function resolvePackageData(
  id: string,
  rootDir: string,
): PackageData {
  const idSplits = id.split('/');
  const pkgId = idSplits.slice(0, 2).join('/');
  const packageJSONPath = resolve.sync(`${pkgId}/package.json`, {
    basedir: rootDir,
    paths: [],
    preserveSymlinks: false,
  });
  const packageJSONData = fse.readJSONSync(packageJSONPath);
  const pkgDir = path.dirname(packageJSONPath);
  return {
    data: packageJSONData,
    dir: pkgDir,
  };
}