import * as path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import type { Config } from '@ice/types';
import type { Context, TaskConfig } from 'build-scripts';
import type { ServerCompiler, ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import ServerCompilerPlugin from '../../webpack/ServerCompilerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import { getRouteExportConfig } from '../../service/config.js';
import { WEB, SERVER_OUTPUT_DIR } from '../../constant.js';
import getWebTask from '../../tasks/web/index.js';
import getServerEntry from '../../utils/getServerEntry.js';
import { getRoutePathsFromCache } from '../../utils/getRoutePaths.js';
import generateHTML from '../../utils/generateHTML.js';
import openBrowser from '../../utils/openBrowser.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';

const getServerCompilerOptions = ({
  rootDir,
  userConfig,
  taskConfigs,
  dataCache,
  serverOutfile,
}: {
  rootDir: string;
  serverOutfile: string;
  userConfig: Context<Config, ExtendsPluginAPI>['userConfig'];
  taskConfigs: TaskConfig<Config>[];
  dataCache: Map<string, string>;
}): Parameters<ServerCompiler> => {
  const { ssg, ssr, server: { format } } = userConfig;
  const entryPoint = getServerEntry(rootDir, taskConfigs[0].config?.server?.entry);
  const esm = format === 'esm';

  return [
    {
      entryPoints: { index: entryPoint },
      outdir: path.dirname(serverOutfile),
      splitting: esm,
      format,
      platform: esm ? 'browser' : 'node',
      outExtension: { '.js': format === 'esm' ? '.mjs' : '.cjs' },
    },
    {
      preBundle: format === 'esm' && (ssr || ssg),
      swc: {
        keepExports: (!ssg && !ssr) ? ['getConfig'] : null,
        keepPlatform: 'node',
        getRoutePaths: () => {
          return getRoutePathsFromCache(dataCache);
        },
      },
    },
  ];
};

const plugin = ({ registerTask, onHook, context }) => {
  const { rootDir, commandArgs, command, userConfig, extendsPluginAPI: { serverCompileTask, dataCache } } = context;
  const { ssg, server: { format } } = userConfig;

  registerTask(WEB, getWebTask({ rootDir, command, dataCache }));
  let serverOutfile: string;
  onHook(`before.${command}.run`, async ({ webpackConfigs, taskConfigs, serverCompiler }) => {
    // Compile server entry after the webpack compilation.
    const { reCompile: reCompileRouteConfig } = getRouteExportConfig(rootDir);
    const outputDir = webpackConfigs[0].output.path;
    serverOutfile = path.join(outputDir, SERVER_OUTPUT_DIR, `index${format === 'esm' ? '.mjs' : '.cjs'}`);
    webpackConfigs[0].plugins.push(
      new ServerCompilerPlugin(
        serverCompiler,
        getServerCompilerOptions({
          rootDir,
          serverOutfile,
          userConfig,
          taskConfigs,
          dataCache,
        }),
        serverCompileTask,
      ),
      // Add webpack plugin of data-loader in web task
      new DataLoaderPlugin({ serverCompiler, rootDir, dataCache }),
      // Add ServerCompilerPlugin
      getServerCompilerPlugin(serverCompiler, {
        rootDir,
        serverEntry: taskConfigs[0].config?.server?.entry,
        outputDir: webpackConfigs[0].output.path,
        dataCache,
        serverCompileTask: command === 'start' ? serverCompileTask : null,
        userConfig,
      }),
    );

    if (command === 'start') {
      webpackConfigs[0].plugins.push(
        new ReCompilePlugin(reCompileRouteConfig, (files) => {
          // Only when routes file changed.
          const routeManifest = JSON.parse(dataCache.get('routes'))?.routeManifest || {};
          const routeFiles = Object.keys(routeManifest).map((key) => {
            const { file } = routeManifest[key];
            return `src/pages/${file}`;
          });
          return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
        }),
      );
    }
  });

  onHook('after.build.compile', async ({ webpackConfigs, serverEntryRef }) => {
    const outputDir = webpackConfigs[0].output.path;
    let renderMode;
    if (ssg) {
      renderMode = 'SSG';
    }
    serverEntryRef.current = serverOutfile;
    // generate html
    await generateHTML({
      rootDir,
      outputDir,
      entry: serverOutfile,
      // only ssg need to generate the whole page html when build time.
      documentOnly: !ssg,
      renderMode,
    });
  });

  onHook('after.start.compile', async ({ isSuccessful, isFirstCompile, urls, devUrlInfo }) => {
    const { port, open } = commandArgs;
    const { devPath, hashChar } = devUrlInfo;
    if (isSuccessful && isFirstCompile) {
      let logoutMessage = '\n';
      logoutMessage += chalk.green(' Starting the development server at:');
      if (process.env.CLOUDIDE_ENV) {
        logoutMessage += `\n   - IDE server: https://${process.env.WORKSPACE_UUID}-${port}.${process.env.WORKSPACE_HOST}${hashChar}${devPath}`;
      } else {
        logoutMessage += `\n
  - Local  : ${chalk.underline.white(`${urls.localUrlForBrowser}${hashChar}${devPath}`)}
  - Network:  ${chalk.underline.white(`${urls.lanUrlForTerminal}${hashChar}${devPath}`)}`;
      }
      consola.log(`${logoutMessage}\n`);

      if (open) {
        openBrowser(`${urls.localUrlForBrowser}${hashChar}${devPath}`);
      }
    }
  });
};

export default plugin;
