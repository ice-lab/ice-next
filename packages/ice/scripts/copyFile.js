import path from 'path';
import fse from 'fs-extra';

async function copyFile() {
  const args = process.argv.slice(2);
  const from = path.join(process.cwd(), args[0]);
  const to = path.join(process.cwd(), args[1]);

  await fse.copy(from, to);
}

copyFile();