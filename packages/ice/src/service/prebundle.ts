import path from 'path';
import { resolve as resolveExports } from 'resolve.exports';
import fse from 'fs-extra';
import { transform, build } from 'esbuild';
import type { TransformOptions } from 'esbuild';
import resolve from 'resolve';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import bundlePlugin from '../esbuild/bundle.js';
import flattenId from '../utils/flattenId.js';

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

export default async function preBundle(
  depsInfo: Record<string, string>,
  rootDir: string,
) {
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
      console.log(`should transform ${filePath} first`);
      const loader = (path.extname(filePath).replace(/^\./, '') || 'jsx') as TransformOptions['loader'];
      const transformed = await transform(entryContent, {
        sourcemap: true,
        sourcefile: filePath,
        loader,
        // tsconfigRaw: fse.readJSONSync(path.join(rootDir, 'tsconfig.json')),
        // TODO: 需要从项目根目录中加载 tsconfig.json 中的内容
        tsconfigRaw: {
          compilerOptions: {},
        },
      });
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
  const outdir = path.join(rootDir, 'node_modules', '.ice');
  await fse.ensureDir(outdir);
  await build({
    absWorkingDir: process.cwd(),
    entryPoints: Object.keys(flatIdDeps),
    bundle: true,
    format: 'esm',
    logLevel: 'error',
    splitting: true,
    sourcemap: true,
    outdir: outdir,
    platform: 'node',
    ignoreAnnotations: true,
    metafile: true,
    plugins: [
      bundlePlugin({ flatIdDeps, flatIdToExports, rootDir }),
    ],
  });
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
