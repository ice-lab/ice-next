import path from 'path';
import fse from 'fs-extra';
import { transform, build } from 'esbuild';
import type { TransformOptions } from 'esbuild';
import resolve from 'resolve';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import bundlePlugin from '../esbuild/bundle.js';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';

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

interface DepInfo {
  file: string;
  src: string;
}

export interface DepsMetaData {
  deps: Record<string, DepInfo>;
}

interface PreBundleDepsResult {
  metadata: DepsMetaData;
}

export default async function preBundleDeps(
  depsInfo: Record<string, string>,
  rootDir: string,
  cacheDir: string,
): Promise<PreBundleDepsResult> {
  const metadata = createDepsMetadata();

  if (!Object.keys(depsInfo)) {
    return {
      metadata,
    };
  }

  const depsCacheDir = getDepsCacheDir(cacheDir);
  const metadataJSONPath = getDepsMetaDataJSONPath(cacheDir);
  // TODO: don't remove it if don't need to update the deps cache
  await fse.emptyDir(depsCacheDir);

  const flatIdDeps: Record<string, string> = {};

  await moduleLexer.init;
  for (const depId in depsInfo) {
    const packageEntry = resolvePackageEntry(depId, rootDir);
    const flatId = flattenId(depId);
    flatIdDeps[flatId] = packageEntry;

    const file = path.join(depsCacheDir, `${flatId}.js`);
    // add meta info to metadata.deps
    metadata.deps[depId] = {
      file,
      src: flatIdDeps[flatId],
    };
  }

  await build({
    absWorkingDir: process.cwd(),
    entryPoints: flatIdDeps,
    bundle: true,
    logLevel: 'error',
    sourcemap: true,
    outdir: depsCacheDir,
    platform: 'node',
    ignoreAnnotations: true,
    plugins: [
      bundlePlugin(metadata),
    ],
  });

  await fse.writeJSON(metadataJSONPath, metadata, { spaces: 2 });

  return {
    metadata,
  };
}

function resolvePackageEntry(depId: string, rootDir: string) {
  const { data: pkgJSONData, dir } = resolvePackageData(depId, rootDir);
  const entryPoint = pkgJSONData['main'];
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

function createDepsMetadata(): DepsMetaData {
  return {
    deps: {},
  };
}

export function getDepsCacheDir(cacheDir: string) {
  return formatPath(path.resolve(cacheDir, 'deps'));
}

export function getDepsMetaDataJSONPath(cacheDir: string) {
  return formatPath(path.resolve(getDepsCacheDir(cacheDir), '_metadata.json'));
}