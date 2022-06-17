import path from 'path';
import glob from 'glob';
import fse from 'fs-extra';
import concurrently from 'concurrently';
import * as chokidar from 'chokidar';

const icePkgPackages = [
  'rax-compat',
  'jsx-runtime',
];

(async () => {
  const filePatten = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${filePatten}`);
  const cwd = path.join(process.cwd(), 'packages');
  const files = glob.sync(filePatten, { cwd, nodir: true });
  for (const file of files) {
    await copyOneFile(file, cwd);
  }

  const watcher = chokidar.watch(cwd, { ignoreInitial: true });
  watcher
    .on('all', (event, filePath) => {
      const availableEvents = ['add', 'change'];
      if (availableEvents.includes(event) &&
        filePath.match(/.+[\\/]src[\\/].+\.(?!ts$|tsx$|rs$)/)) {
        console.log('non-ts change detected:', filePath);
        copyOneFile(path.relative(cwd, filePath), cwd);
      }
    });

  const waitOnIcePkgPackagesCommand = `wait-on ${icePkgPackages.map(p => `./packages/${p}/esm`).join(' ')}`;
  const { result } = concurrently([
    ...(icePkgPackages.map(p => ({ command: 'npm run watch', cwd: path.join(`./packages/${p}`) }))),
    { command: `${waitOnIcePkgPackagesCommand} && pnpm tsc --build ./tsconfig.json -w`, cwd: process.cwd() },
  ]);
  await result;
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});

async function copyOneFile(file: string, cwd: string) {
  const from = path.join(cwd, file);
  const to = path.join(cwd, file.replace(/\/src\//, '/esm/'));
  await fse.copy(from, to);
}
