import * as path from 'path';
import type { IPlugin, IPluginAPI } from 'build-scripts';
import Generator from './generator';
import getBuildConfig from './utils/getBuildConfig';

interface Options {
  hasJsxRuntime: boolean;
}

function getDefaultRenderData(api: IPluginAPI, options: Options) {
  const { context } = api;
  const { userConfig } = context;
  const { hasJsxRuntime } = options;
  const { ssr = false } = userConfig;
  const renderData = {
    buildConfig: getBuildConfig(userConfig),
    hasJsxRuntime,
    relativeCorePath: '.',
    typesPath: '../types',
  };
  return {
    ...renderData,
    isReact: true,
    isRax: false,
    ssr,
    // MPA 下会覆盖
    enableRouter: (!userConfig.mpa && userConfig.router !== false),
  };
}

function initGenerator(api: IPluginAPI, options: Options) {
  const { getAllPlugin, context, log } = api;
  const { rootDir } = context;
  const plugins = getAllPlugin();
  const targetDir = path.join(rootDir, '.ice');
  return new Generator({
    rootDir,
    targetDir,
    defaultData: getDefaultRenderData(api, options),
    log,
    plugins,
  });
}

function renderDefaultTemplate(generator: Generator) {
  const templateRoot = path.join(__dirname, './generator/template');

  const templates = [{
    dir: path.join(templateRoot, 'core'),
    target: 'core',
  }, {
    dir: path.join(templateRoot, 'types'),
    target: 'types',
  }, {
    path: path.join(templateRoot, './index.ts.ejs'),
  }];
  templates.forEach(({ dir, target, path: filePath }) => {
    generator.addTemplateFiles({
      template: dir || filePath,
      targetDir: target || '',
    });
  });
}

const plugin: IPlugin = (api) => {
  const { context, onHook } = api;
  const { rootDir, command } = context;
  const hasJsxRuntime = (() => {
    try {
      // auto detect of jsx runtime
      // eslint-disable-next-line
      const tsConfig = require(path.join(rootDir, 'tsconfig.json'));
      if (tsConfig?.compilerOptions?.jsx !== 'react-jsx') {
        return false;
      }
      // ensure react/jsx-runtime
      require.resolve('react/jsx-runtime');
      return true;
    } catch (e) {
      return false;
    }
  })();
  const generator = initGenerator(api, { hasJsxRuntime });
  renderDefaultTemplate(generator);

  onHook(`before.${command}.run`, () => {
    generator.render();
  });
};

export default plugin;
