import path from 'path';
import consola from 'consola';
import chalk from 'chalk';
import fse from 'fs-extra';
import getMiniappTask from '../../tasks/miniapp/index.js';
import { getAppExportConfig, getRouteExportConfig } from '../../service/config.js';
import getMiniappPlatformConfig from '../../tasks/miniapp/platforms/index.js';


const plugin = ({ registerTask, onHook, context }) => {
  const { userConfig, commandArgs, rootDir, command, extendsPluginAPI: { dataCache } } = context;
  const { platform } = commandArgs;
  const { getAppConfig } = getAppExportConfig(rootDir);
  const { getRoutesConfig } = getRouteExportConfig(rootDir);
  const { projectConfigJson } = getMiniappPlatformConfig(platform);
  registerTask(platform, getMiniappTask({ rootDir, command, platform, getAppConfig, getRoutesConfig, dataCache }));

  onHook(`before.${command}.run`, async ({ webpackConfigs }) => {
    if (projectConfigJson) {
      const outputDir = webpackConfigs[0].output.path;
      fse.ensureDirSync(outputDir);
      const projectConfigJsonPath = path.join(outputDir, projectConfigJson);
      // TODO: maybe changed
      const projectConfigJsonContent = userConfig?.miniapp?.nativeConfig || {};
      fse.writeJSONSync(projectConfigJsonPath, projectConfigJsonContent);
    }
  });

  onHook('after.start.compile', async ({ isSuccessful, isFirstCompile }) => {
    if (isSuccessful && isFirstCompile) {
      let logoutMessage = '\n';
      logoutMessage += chalk.green(`Use ${platform} developer tools to open the following folder:`);
      logoutMessage += `\n${chalk.underline.white(rootDir)}`;
      consola.log(`${logoutMessage}\n`);
    }
  });
};

export default plugin;
