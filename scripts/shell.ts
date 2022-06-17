import { execaCommand } from 'execa';

interface Options {
  cwd?: string;
}

export async function run(command: string, options: Options = {}) {
  const cwd = options['cwd'] ?? process.cwd();
  console.log(`[RUN]: ${command} in ${cwd}`);
  return execaCommand(command, { stdio: 'inherit', cwd });
}