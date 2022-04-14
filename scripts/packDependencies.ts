import * as path from 'path';
import { createRequire } from 'module';
import fs from 'fs-extra';
import ncc from '@vercel/ncc';
import chalk from 'chalk';
// @ts-expect-error
const require = createRequire(import.meta.url);

console.log('ncc ==>', ncc);

interface Options {
  pkgName: string;
  rootDir: string;
  target: string;
  file: string;
  externals: Record<string, string>;
  minify: boolean;
  matchCopyFiles: (data: {
    file: string;
    pkgName: string;
    resolvePath: string;
    resolveId: string;
  }) => boolean;
}

export async function packDependency(options: Options): Promise<void> {
  const { pkgName, file, rootDir, target, externals, minify, matchCopyFiles } = options;
  console.log(chalk.green(`start pack ${pkgName || file}`));

  const targetPath = path.join(rootDir, target);
  fs.removeSync(targetPath);

  let packEntry: string;
  const filesToCopy = [];
  if (pkgName) {
    packEntry = require.resolve(pkgName, {
      paths: [rootDir],
    });
  } else {
    packEntry = path.join(rootDir, file);
  }
  fs.ensureDirSync(target);
  // @ts-expect-error
  let { code, assets } = await ncc(packEntry, {
    externals,
    minify,
    target: 'node14',
    assetsBuilds: false,
    customEmit(filePath: string, opts: {id: string}) {
      const { id } = opts;
      if (matchCopyFiles && matchCopyFiles({
        file,
        pkgName,
        resolvePath: filePath,
        resolveId: id,
      })) {
        console.log(filePath);
        filesToCopy.push(filePath);
        return `./${path.basename(filePath)}`;
      }
    },
  });
  for (const assetKey of Object.keys(assets)) {
    const asset = assets[assetKey];
    const data = asset.source;
    const fileTarget = path.join(target, assetKey);
    fs.ensureDirSync(path.dirname(fileTarget));
    fs.writeFileSync(fileTarget, data);
  }
  // copy files
  for (const fileToCopy of filesToCopy) {
    let content = fs.readFileSync(fileToCopy, 'utf-8');
    for (const key of Object.keys(externals)) {
      content = content.replace(
        new RegExp(`require\\(['"]${key}['"]\\)`, 'gm'),
        `require('${externals[key]}')`,
      );
      content = content.replace(
        new RegExp(`require\\(['"]${key}/package(.json)?['"]\\)`, 'gm'),
        `require('${externals[key]}/package.json')`,
      );
    }
    fs.writeFileSync(
      path.join(target, path.basename(fileToCopy)),
      content,
      'utf-8',
    );
  }
}