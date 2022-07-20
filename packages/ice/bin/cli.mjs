#!/usr/bin/env node
import chalk from 'chalk';
import { program } from 'commander';
import path from 'path';
import fse from 'fs-extra';
import { fileURLToPath } from 'url';
import semver from 'semver';
import detectPort from 'detect-port';
// hijack webpack before import other modules
import '../esm/requireHook.js';
import Service from '../esm/Service.js';
import getRoutePaths from "../esm/utils/getRoutePaths.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

// App program entry.
(async function () {
  const icePackageInfo = await fse.readJSON(path.join(__dirname, '../package.json'));
  const frameworkName = icePackageInfo.name;
  const requiredNodeVersion = icePackageInfo.engines.node;
  const satisfied = checkNodeVersion(requiredNodeVersion, frameworkName);
  if (!satisfied) {
    console.log();
    console.log(chalk.red(`  You are using Node.js ${process.version}`));
    console.log(chalk.red(`  ${frameworkName} requires Node.js ${requiredNodeVersion}, please update the version of Node.js.`));
    console.log();
    console.log();
    process.exit(1);
  }

  // Describe the version of package `@ice/app`.
  process.env.__ICE_VERSION__ = icePackageInfo.version;

  program
    .version(icePackageInfo.version)
    .usage('<command> [options]');

  program
    .command('build')
    .description('build project')
    .allowUnknownOption()
    .option('--mode <mode>', 'set mode', 'production')
    .option('--analyzer', 'visualize size of output files', false)
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      const service = new Service({ rootDir, command: 'build', commandArgs });
      await service.start();
      const build = await import('../esm/commands/build.js');
      await build.default(service);
    });

  program
    .command('start')
    .alias('dev')
    .alias('serve')
    .description('start dev server')
    .allowUnknownOption()
    .option('--mode <mode>', 'set mode', 'development')
    .option('--config <config>', 'custom config path')
    .option('-h, --host <host>', 'dev server host', '0.0.0.0')
    .option('-p, --port <port>', 'dev server port', 3000)
    .option('--no-open', 'don\'t open browser on startup')
    .option('--no-mock', 'don\'t start mock service')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .option('--analyzer', 'visualize size of output files', false)
    .option('--https [https]', 'enable https', false)
    .option('--force', 'force remove cache directory', false)
    .action(async ({ rootDir, ...commandArgs }) => {
      commandArgs.port = await detectPort(commandArgs.port);
      const service = new Service({ rootDir, command: 'start', commandArgs });
      await service.start();
      const serve = await import('../esm/commands/serve.js');
      const routePaths = getRoutePaths(service.routesInfo.routes)
        .sort((a, b) =>
          // Sort by length, the shortest path first.
          a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
      const devPath = (routePaths[0] || '').replace(/^\//, '');
      await serve.default(service, { devPath });
    });

  program
    .command('test')
    .description('run tests with jest')
    .allowUnknownOption() // allow jest config
    .option('--mode <mode>', 'set mode', 'test')
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      // @TODO: command test is not support yet.
      console.warn(chalk.yellow('Command "test" is not support yet.'));
    });

  program.parse(process.argv);

  const proc = program.runningCommand;

  if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
      process.exit(1);
    });
  }

  const subCmd = program.args[0];
  if (!subCmd) {
    program.help();
  }
})();

/**
 * Check if the current Node version is compatible with this application.
 * @param requiredNodeVersion
 * @param frameworkName default to 'ice'
 * @returns {boolean} true if compatible.
 */
function checkNodeVersion(requiredNodeVersion, frameworkName = 'ice') {
  return semver.satisfies(process.version, requiredNodeVersion, {});
}
