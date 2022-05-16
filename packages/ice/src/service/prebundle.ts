import path from 'path';
import { resolve as resolveExports } from 'resolve.exports';
import fse from 'fs-extra';
import { transform, build } from 'esbuild';
import type { TransformOptions } from 'esbuild';
import resolve from 'resolve';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import consola from 'consola';
import bundlePlugin from '../esbuild/bundle.js';
import flattenId from '../utils/flattenId.js';
import formatPath from '../utils/formatPath.js';

export type ExportsData = ReturnType<typeof moduleLexer.parse> & {
  // es-module-lexer has a facade detection but isn't always accurate for our
  // use case when the module has default export
  hasReExports?: true;
};

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

interface DepMetaData {
  deps: Record<string, DepInfo>;
}

interface PreBundleResult {
  metadata: DepMetaData;
}

export default async function preBundle(
  depsInfo: Record<string, string>,
  rootDir: string,
  cacheDir: string,
): Promise<PreBundleResult> {
  const metadata = createDepsMetadata();

  if (!Object.keys(depsInfo)) {
    return {
      metadata,
    };
  }

  const depsCacheDir = getDepsCacheDir(cacheDir);
  const metadataJSONPath = getDepsMetaDataJSONPath(cacheDir);

  await fse.ensureDir(depsCacheDir);

  const flatIdDeps: Record<string, string> = {};
  const flatIdToExports: Record<string, ExportsData> = {};

  await moduleLexer.init;
  for (const depId in depsInfo) {
    const packageEntry = resolvePackageEntry(depId, rootDir);
    const flatId = flattenId(depId);
    const filePath = (flatIdDeps[flatId] = packageEntry);

    let exportsData: ExportsData;
    const entryContent = await fse.readFile(filePath, 'utf-8');
    try {
      exportsData = moduleLexer.parse(entryContent) as ExportsData;
    } catch {
      consola.debug(`should transform ${filePath} first.`);
      // TODO: loader
      const transformed = await transformWithESBuild(
        entryContent,
        filePath,
        rootDir,
        {},
      );
      exportsData = moduleLexer.parse(transformed.code) as ExportsData;
    }
    for (const { ss, se } of exportsData[0]) {
      const exp = entryContent.slice(ss, se);
      if (/export\s+\*\s+from/.test(exp)) {
        exportsData.hasReExports = true;
      }
    }
    flatIdToExports[flatId] = exportsData;
  }

  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: Object.keys(flatIdDeps),
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    splitting: true,
    sourcemap: true,
    outdir: depsCacheDir,
    platform: 'node',
    ignoreAnnotations: true,
    metafile: true,
    plugins: [
      bundlePlugin({ flatIdDeps, flatIdToExports, rootDir }),
    ],
  });

  for (const depId in depsInfo) {
    const flatId = flattenId(depId);
    // add meta info to metadata.deps
    metadata.deps[depId] = {
      file: flatId,
      src: flatIdDeps[flatId],
    };
  }

  return {
    metadata,
  };
}

async function transformWithESBuild(
  input: string,
  filePath: string,
  rootDir: string,
  options: TransformOptions,
) {
  let loader = options?.loader as TransformOptions['loader'];
  if (!loader) {
    const extname = path.extname(filePath).slice(1);
    if (extname === 'mjs' || extname === 'cjs') {
      loader = 'js';
    } else {
      loader = extname as TransformOptions['loader'];
    }
  }

  let tsconfigRaw = options?.tsconfigRaw;
  if (!tsconfigRaw) {
    let tsconfigRaw = {
      compilerOptions: {},
    };
    let loadedCompilerOptions = {};
    const tsconfigPath = path.join(rootDir, 'tsconfig.json');
    if ((loader === 'ts' || loader === 'tsx') && fse.pathExistsSync(tsconfigPath)) {
      const tsconfig = await fse.readJSON(tsconfigPath);
      loadedCompilerOptions = tsconfig.compilerOptions ?? {};
    }

    tsconfigRaw = {
      ...tsconfigRaw,
      compilerOptions: {
        ...loadedCompilerOptions,
        ...tsconfigRaw?.compilerOptions,
      },
    };
  }

  const transformOptions = {
    sourcemap: true,
    sourcefile: filePath,
    ...options,
    loader,
    tsconfigRaw,
  } as TransformOptions;

  return await transform(input, transformOptions);
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

function createDepsMetadata(): DepMetaData {
  return {
    deps: {},
  };
}

export function getDepsCacheDir(cacheDir: string) {
  return formatPath(path.resolve(cacheDir, 'deps'));
}

export function getDepsMetaDataJSONPath(cacheDir: string) {
  return formatPath(path.resolve(getDepsCacheDir(cacheDir), 'metadata.json'));
}