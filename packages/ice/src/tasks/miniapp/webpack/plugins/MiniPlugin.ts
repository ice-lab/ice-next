import { fileURLToPath } from 'url';
import path from 'path';
import taroHelper from '@tarojs/helper';

import type { RecursiveTemplate, UnRecursiveTemplate } from '@tarojs/shared/dist/template';
import type { AppConfig, Config } from '@tarojs/taro';
import fs from 'fs-extra';
import { minify } from 'html-minifier';
import { urlToRequest } from 'loader-utils';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import EntryDependency from 'webpack/lib/dependencies/EntryDependency.js';
import webpackSources from 'webpack-sources';

import TaroSingleEntryDependency from '../dependencies/TaroSingleEntryDependency.js';
import { componentConfig } from '../template/component.js';
import type { IComponent } from '../utils/types.js';
import TaroLoadChunksPlugin from './TaroLoadChunksPlugin.js';
import TaroNormalModulesPlugin from './TaroNormalModulesPlugin.js';

const { ConcatSource, RawSource } = webpackSources;
const {
  isAliasPath,
  isEmptyObject,
  META_TYPE,
  NODE_MODULES_REG,
  printLog,
  processTypeEnum,
  promoteRelativePath,
  readConfig,
  REG_STYLE,
  replaceAliasPath,
  resolveMainFilePath,
  SCRIPT_EXT,
} = taroHelper;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLUGIN_NAME = 'TaroMiniPlugin';

export interface IComponentObj {
  name?: string;
  path: string | null;
  type?: string;
}

interface FilesConfig {
  [configName: string]: {
    content: Config;
    path: string;
  };
}

function isLoaderExist(loaders, loaderName: string) {
  return loaders.some(item => item.loader === loaderName);
}

export default class TaroMiniPlugin {
  /** 插件配置选项 */
  options: any;
  context: string;
  /** app 入口文件路径 */
  appEntry: string;
  /** app config 配置内容 */
  appConfig: AppConfig;
  /** app、页面、组件的配置集合 */
  filesConfig: FilesConfig = {};
  isWatch = false;
  /** 页面列表 */
  pages = new Set<IComponent>();
  components = new Set<IComponent>();
  /** tabbar icon 图片路径列表 */
  tabBarIcons = new Set<string>();
  prerenderPages: Set<string>;
  dependencies = new Map<string, TaroSingleEntryDependency>();
  loadChunksPlugin: TaroLoadChunksPlugin;
  themeLocation: string;
  pageLoaderName = '@ice/miniapp-loader/lib/page.js';
  independentPackages = new Map<string, string[]>();

  constructor(options = {}) {
    this.options = Object.assign({
      sourceDir: '',
      framework: 'nerv',
      commonChunks: ['runtime', 'vendors'],
      fileType: {
        style: '.wxss',
        config: '.json',
        script: '.js',
        templ: '.wxml',
        xs: '.wxs',
      },
      minifyXML: {},
      hot: false,
    }, options);

    this.options.loaderMeta = {
      importFrameworkStatement: `
import * as React from 'react'
import ReactDOM from 'react-dom'
`,
      mockAppStatement: `
class App extends React.Component {
  render () {
    return this.props.children
  }
}
`,
      frameworkArgs: 'React, ReactDOM, config',
      creator: 'createReactApp',
      creatorLocation: '@tarojs/plugin-framework-react/dist/runtime',
      importFrameworkName: 'React',
    };

    const { template, baseLevel } = this.options;
    if (template.isSupportRecursive === false && baseLevel > 0) {
      (template as UnRecursiveTemplate).baseLevel = baseLevel;
    }
    this.prerenderPages = new Set();
  }

  /**
   * 自动驱动 tapAsync
   */
  tryAsync<T extends webpack.Compiler | webpack.Compilation>(fn: (target: T) => Promise<any>) {
    return async (arg: T, callback: any) => {
      try {
        await fn(arg);
        callback();
      } catch (err) {
        callback(err);
      }
    };
  }

  /**
   * 插件入口
   */
  apply(compiler: webpack.Compiler) {
    this.context = compiler.context;
    this.appEntry = this.getAppEntry(compiler);
    const {
      commonChunks,
      addChunkPages,
      framework,
    } = this.options;
    /** build mode */
    compiler.hooks.run.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compiler>(async compiler => {
        await this.run(compiler);
        new TaroLoadChunksPlugin({
          commonChunks: commonChunks,
          addChunkPages: addChunkPages,
          pages: this.pages,
          framework: framework,
        }).apply(compiler);
      }),
    );

    /** watch mode */
    compiler.hooks.watchRun.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compiler>(async compiler => {
        const changedFiles = this.getChangedFiles(compiler);
        if (changedFiles?.size > 0) {
          this.isWatch = true;
        }
        await this.run(compiler);
        if (!this.loadChunksPlugin) {
          this.loadChunksPlugin = new TaroLoadChunksPlugin({
            commonChunks: commonChunks,
            addChunkPages: addChunkPages,
            pages: this.pages,
            framework: framework,
          });
          this.loadChunksPlugin.apply(compiler);
        }
      }),
    );

    /** compilation.addEntry */
    compiler.hooks.make.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compilation>(async compilation => {
        const { dependencies } = this;
        const promises: Promise<null>[] = [];
        dependencies.forEach(dep => {
          promises.push(new Promise<null>((resolve, reject) => {
            compilation.addEntry(this.options.sourceDir, dep, {
              name: dep.name,
              ...dep.options,
            }, err => (err ? reject(err) : resolve(null)));
          }));
        });
        await Promise.all(promises);
        await this.options.onCompilerMake?.(compilation);
      }),
    );

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      /** For Webpack compilation get factory from compilation.dependencyFactories by denpendence's constructor */
      compilation.dependencyFactories.set(EntryDependency, normalModuleFactory);
      compilation.dependencyFactories.set(TaroSingleEntryDependency as any, normalModuleFactory);

      /**
       * webpack NormalModule 在 runLoaders 真正解析资源的前一刻，
       * 往 NormalModule.loaders 中插入对应的 Taro Loader
       */
      webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME, (_loaderContext, module:/** TaroNormalModule */ any) => {
        const { framework, loaderMeta = {}, designWidth, deviceRatio } = this.options;
        if (module.miniType === META_TYPE.PAGE) {
          const loaderName = this.pageLoaderName;
          if (!isLoaderExist(module.loaders, loaderName)) {
            module.loaders.unshift({
              loader: loaderName,
              options: {
                framework,
                loaderMeta,
                name: module.name,
                prerender: false,
                config: this.filesConfig,
                appConfig: this.appConfig,
                hot: this.options.hot,
              },
            });
          }
        } else if (module.miniType === META_TYPE.COMPONENT) {
          const loaderName = '@ice/miniapp-loader/lib/component.js';
          if (!isLoaderExist(module.loaders, loaderName)) {
            module.loaders.unshift({
              loader: loaderName,
              options: {
                framework,
                loaderMeta,
                name: module.name,
                prerender: false,
              },
            });
          }
        }
      });

      compilation.hooks.processAssets.tapAsync(
        {
          name: PLUGIN_NAME,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        this.tryAsync<any>(async () => {
          await this.generateMiniFiles(compilation);
        }),
      );
    });

    compiler.hooks.afterEmit.tapAsync(
      PLUGIN_NAME,
      this.tryAsync<webpack.Compilation>(async compilation => {
        await this.addTarBarFilesToDependencies(compilation);
      }),
    );

    new TaroNormalModulesPlugin(this.options.onParseCreateElement).apply(compiler);
  }

  /**
   * 根据 webpack entry 配置获取入口文件路径
   * @returns app 入口文件路径
   */
  getAppEntry(compiler: webpack.Compiler) {
    // const originalEntry = compiler.options.entry as webpack.Entry
    // compiler.options.entry = {}
    // return path.resolve(this.context, originalEntry.app[0])
    const { entry } = compiler.options;
    if (this.options.appEntry) {
      compiler.options.entry = {};
      return this.options.appEntry;
    }
    function getEntryPath(entry) {
      const app = entry.main;
      if (Array.isArray(app)) {
        return app[0];
      } else if (Array.isArray(app.import)) {
        return app.import[0];
      }
      return app;
    }
    const appEntryPath = getEntryPath(entry);
    compiler.options.entry = {};
    return appEntryPath;
  }

  getChangedFiles(compiler: webpack.Compiler) {
    return compiler.modifiedFiles;
  }

  /**
   * 分析 app 入口文件，搜集页面、组件信息，
   * 往 this.dependencies 中添加资源模块
   */
  run(compiler: webpack.Compiler) {
    this.appConfig = this.getAppConfig();
    this.getPages();
    this.getPagesConfig();
    this.getDarkMode();
    this.getConfigFiles(compiler);
    this.addEntries();
  }

  /**
   * 获取 app config 配置内容
   * @returns app config 配置内容
   */
  getAppConfig(): AppConfig {
    // FIXME:
    // 从 .ice/route.manifest.json 提取 pages 信息
    // TODO: window 配置后续从 app.tsx 提取
    const appName = path.basename(this.appEntry).replace(path.extname(this.appEntry), '');
    this.compileFile({
      name: appName,
      path: this.appEntry,
      isNative: false,
    });

    // FIXME:
    const appConfig = {
      pages: ['pages/index'],
    };

    // this.filesConfig[this.getConfigFilePath(appName)] = {
    //   content: appConfig,
    //   path: this.appEntry
    // };
    // const fileConfig = this.filesConfig[this.getConfigFilePath(appName)]
    // const appConfig = fileConfig ? fileConfig.content || {} : {}
    if (isEmptyObject(appConfig)) {
      throw new Error('缺少 app 全局配置文件，请检查！');
    }
    return appConfig as AppConfig;
  }

  /**
   * 根据 app config 的 pages 配置项，收集所有页面信息，
   * 包括处理分包和 tabbar
   */
  getPages() {
    if (isEmptyObject(this.appConfig)) {
      throw new Error('缺少 app 全局配置文件，请检查！');
    }
    const appPages = this.appConfig.pages;
    if (!appPages || !appPages.length) {
      throw new Error('全局配置缺少 pages 字段，请检查！');
    }

    printLog(processTypeEnum.COMPILE, '发现入口', this.getShowPath(this.appEntry));
    if (!this.isWatch && this.options.logger?.quiet === false) {
    }
    const { framework } = this.options;
    this.prerenderPages = new Set();
    this.getTabBarFiles(this.appConfig);
    this.pages = new Set([
      ...appPages.map<IComponent>(item => {
        const pagePath = resolveMainFilePath(path.join(this.options.sourceDir, item), SCRIPT_EXT);
        const pageTemplatePath = this.getTemplatePath(pagePath);
        const isNative = this.isNativePageORComponent(pageTemplatePath);
        return {
          name: item,
          path: pagePath,
          isNative,
          stylePath: isNative ? this.getStylePath(pagePath) : undefined,
          templatePath: isNative ? this.getTemplatePath(pagePath) : undefined,
        };
      }),
    ]);
    this.getSubPackages(this.appConfig);
  }

  /**
   * 读取页面及其依赖的组件的配置
   */
  getPagesConfig() {
    this.pages.forEach(page => {
      if (!this.isWatch && this.options.logger?.quiet === false) {
        printLog(processTypeEnum.COMPILE, '发现页面', this.getShowPath(page.path));
      }
      this.compileFile(page);
    });
  }

  /**
   * 往 this.dependencies 中新增或修改所有 config 配置模块
   */
  getConfigFiles(compiler: webpack.Compiler) {
    const { filesConfig } = this;
    Object.keys(filesConfig).forEach(item => {
      if (fs.existsSync(filesConfig[item].path)) {
        this.addEntry(filesConfig[item].path, item, META_TYPE.CONFIG);
      }
    });

    // webpack createChunkAssets 前一刻，去除所有 config chunks
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.beforeChunkAssets.tap(PLUGIN_NAME, () => {
        const { chunks } = compilation;
        const configNames = Object.keys(filesConfig);

        for (const chunk of chunks) {
          if (configNames.find(configName => configName === chunk.name)) chunks.delete(chunk);
        }
      });
    });
  }

  /**
   * 在 this.dependencies 中新增或修改模块
   */
  addEntry(entryPath: string, entryName: string, entryType: any, options = {}) {
    let dep: TaroSingleEntryDependency;
    if (this.dependencies.has(entryPath)) {
      dep = this.dependencies.get(entryPath)!;
      dep.name = entryName;
      dep.loc = { name: entryName };
      dep.request = entryPath;
      dep.userRequest = entryPath;
      dep.miniType = entryType;
      dep.options = options;
    } else {
      dep = new TaroSingleEntryDependency(entryPath, entryName, { name: entryName }, entryType, options);
    }
    this.dependencies.set(entryPath, dep);
  }

  /**
   * 在 this.dependencies 中新增或修改 app、模板组件、页面、组件等资源模块
   */
  addEntries() {
    const { template } = this.options;
    this.addEntry(this.appEntry, 'app', META_TYPE.ENTRY);
    if (!template.isSupportRecursive) {
      this.addEntry(path.resolve(__dirname, '..', 'template/comp'), 'comp', META_TYPE.STATIC);
    }
    this.addEntry(path.resolve(__dirname, '..', 'template/custom-wrapper'), 'custom-wrapper', META_TYPE.STATIC);
    this.pages.forEach(item => {
      if (item.isNative) {
        this.addEntry(item.path, item.name, META_TYPE.NORMAL);
        if (item.stylePath && fs.existsSync(item.stylePath)) {
          this.addEntry(item.stylePath, this.getStylePath(item.name), META_TYPE.NORMAL);
        }
        if (item.templatePath && fs.existsSync(item.templatePath)) {
          this.addEntry(item.templatePath, this.getTemplatePath(item.name), META_TYPE.NORMAL);
        }
      } else {
        this.addEntry(item.path, item.name, META_TYPE.PAGE);
      }
    });
    this.components.forEach(item => {
      if (item.isNative) {
        this.addEntry(item.path, item.name, META_TYPE.NORMAL);
        if (item.stylePath && fs.existsSync(item.stylePath)) {
          this.addEntry(item.stylePath, this.getStylePath(item.name), META_TYPE.NORMAL);
        }
        if (item.templatePath && fs.existsSync(item.templatePath)) {
          this.addEntry(item.templatePath, this.getTemplatePath(item.name), META_TYPE.NORMAL);
        }
      } else {
        this.addEntry(item.path, item.name, META_TYPE.COMPONENT);
      }
    });
  }

  replaceExt(file: string, ext: string) {
    return path.join(path.dirname(file), `${path.basename(file, path.extname(file))}${ext}`);
  }

  /**
   * 读取页面、组件的配置，并递归读取依赖的组件的配置
   */
  compileFile(file: IComponent) {
    const filePath = file.path;
    const fileConfigPath = file.isNative ? this.replaceExt(filePath, '.json') : this.getConfigFilePath(filePath);
    const fileConfig = readConfig(fileConfigPath);
    const { usingComponents } = fileConfig;

    // 递归收集依赖的第三方组件
    if (usingComponents) {
      const componentNames = Object.keys(usingComponents);
      const depComponents: Array<{ name: string; path: string }> = [];
      const { alias } = this.options;
      for (const compName of componentNames) {
        let compPath = usingComponents[compName];

        if (isAliasPath(compPath, alias)) {
          compPath = replaceAliasPath(filePath, compPath, alias);
          fileConfig.usingComponents[compName] = compPath;
        }

        depComponents.push({
          name: compName,
          path: compPath,
        });

        if (!componentConfig.thirdPartyComponents.has(compName) && !file.isNative) {
          componentConfig.thirdPartyComponents.set(compName, new Set());
        }
      }
      depComponents.forEach(item => {
        const componentPath = resolveMainFilePath(path.resolve(path.dirname(file.path), item.path));
        if (fs.existsSync(componentPath) && !Array.from(this.components).some(item => item.path === componentPath)) {
          const componentName = this.getComponentName(componentPath);
          const componentTempPath = this.getTemplatePath(componentPath);
          const isNative = this.isNativePageORComponent(componentTempPath);
          const componentObj = {
            name: componentName,
            path: componentPath,
            isNative,
            stylePath: isNative ? this.getStylePath(componentPath) : undefined,
            templatePath: isNative ? this.getTemplatePath(componentPath) : undefined,
          };
          this.components.add(componentObj);
          this.compileFile(componentObj);
        }
      });
    }

    this.filesConfig[this.getConfigFilePath(file.name)] = {
      content: fileConfig,
      path: fileConfigPath,
    };
  }

  /**
   * 收集分包配置中的页面
   */
  getSubPackages(appConfig: AppConfig) {
    const subPackages = appConfig.subPackages || appConfig.subpackages;
    const { framework } = this.options;
    if (subPackages && subPackages.length) {
      subPackages.forEach(item => {
        if (item.pages && item.pages.length) {
          const { root } = item;
          const isIndependent = !!item.independent;
          if (isIndependent) {
            this.independentPackages.set(root, []);
          }
          item.pages.forEach(page => {
            let pageItem = `${root}/${page}`;
            pageItem = pageItem.replace(/\/{2,}/g, '/');
            let hasPageIn = false;
            this.pages.forEach(({ name }) => {
              if (name === pageItem) {
                hasPageIn = true;
              }
            });
            if (!hasPageIn) {
              const pagePath = resolveMainFilePath(path.join(this.options.sourceDir, pageItem), SCRIPT_EXT);
              const templatePath = this.getTemplatePath(pagePath);
              const isNative = this.isNativePageORComponent(templatePath);
              if (isIndependent) {
                const independentPages = this.independentPackages.get(root);
                independentPages?.push(pagePath);
              }
              this.pages.add({
                name: pageItem,
                path: pagePath,
                isNative,
                stylePath: isNative ? this.getStylePath(pagePath) : undefined,
                templatePath: isNative ? this.getTemplatePath(pagePath) : undefined,
              });
            }
          });
        }
      });
    }
  }

  /**
   * 收集 dark mode 配置中的文件
   */
  getDarkMode() {
    const { themeLocation } = this.appConfig;
    const darkMode = this.appConfig.darkmode;
    if (darkMode && themeLocation && typeof themeLocation === 'string') {
      this.themeLocation = themeLocation;
    }
  }

  /**
   * 搜集 tabbar icon 图标路径
   * 收集自定义 tabbar 组件
   */
  getTabBarFiles(appConfig: AppConfig) {
    const { tabBar } = appConfig;
    const { sourceDir, framework } = this.options;
    if (tabBar && typeof tabBar === 'object' && !isEmptyObject(tabBar)) {
      // eslint-disable-next-line dot-notation
      const list = tabBar['list'] || [];
      list.forEach(item => {
        // eslint-disable-next-line dot-notation
        item['iconPath'] && this.tabBarIcons.add(item['iconPath']);
        // eslint-disable-next-line dot-notation
        item['selectedIconPath'] && this.tabBarIcons.add(item['selectedIconPath']);
      });
      if (tabBar.custom) {
        const customTabBarPath = path.join(sourceDir, 'custom-tab-bar');
        const customTabBarComponentPath = resolveMainFilePath(customTabBarPath, [...SCRIPT_EXT]);
        if (fs.existsSync(customTabBarComponentPath)) {
          const customTabBarComponentTemplPath = this.getTemplatePath(customTabBarComponentPath);
          const isNative = this.isNativePageORComponent(customTabBarComponentTemplPath);
          if (!this.isWatch && this.options.logger?.quiet === false) {
            printLog(processTypeEnum.COMPILE, '自定义 tabBar', this.getShowPath(customTabBarComponentPath));
          }
          const componentObj: IComponent = {
            name: 'custom-tab-bar/index',
            path: customTabBarComponentPath,
            isNative,
            stylePath: isNative ? this.getStylePath(customTabBarComponentPath) : undefined,
            templatePath: isNative ? this.getTemplatePath(customTabBarComponentPath) : undefined,
          };
          this.compileFile(componentObj);
          this.components.add(componentObj);
        }
      }
    }
  }

  /** 是否为小程序原生页面或组件 */
  isNativePageORComponent(templatePath: string): boolean {
    return fs.existsSync(templatePath);
  }

  getShowPath(filePath: string) {
    return filePath.replace(this.context, '').replace(/\\/g, '/').replace(/^\//, '');
  }

  /** 生成小程序相关文件 */
  async generateMiniFiles(compilation: webpack.Compilation) {
    const { template, modifyBuildAssets, modifyMiniConfigs, sourceDir } = this.options;
    const baseTemplateName = 'base';
    const baseCompName = 'comp';
    const customWrapperName = 'custom-wrapper';

    /**
     * 与原生小程序混写时解析模板与样式
     */
    compilation.getAssets().forEach(({ name: assetPath }) => {
      const styleExt = this.options.fileType.style;
      const templExt = this.options.fileType.templ;
      if (new RegExp(`(\\${styleExt}|\\${templExt})\\.js(\\.map){0,1}$`).test(assetPath)) {
        delete compilation.assets[assetPath];
      } else if (new RegExp(`${styleExt}${styleExt}$`).test(assetPath)) {
        const assetObj = compilation.assets[assetPath];
        const newAssetPath = assetPath.replace(styleExt, '');
        compilation.assets[newAssetPath] = assetObj;
        delete compilation.assets[assetPath];
      }
    });

    if (typeof modifyMiniConfigs === 'function') {
      await modifyMiniConfigs(this.filesConfig);
    }
    if (!this.options.blended) {
      const appConfigPath = this.getConfigFilePath(this.appEntry);
      const appConfigName = path.basename(appConfigPath).replace(path.extname(appConfigPath), '');
      this.generateConfigFile(compilation, this.appEntry, this.filesConfig[appConfigName] ? this.filesConfig[appConfigName].content : {});
    }
    if (!template.isSupportRecursive) {
      // 如微信、QQ 不支持递归模版的小程序，需要使用自定义组件协助递归
      this.generateTemplateFile(compilation, baseCompName, template.buildBaseComponentTemplate, this.options.fileType.templ);
      this.generateConfigFile(compilation, baseCompName, {
        component: true,
        usingComponents: {
          [baseCompName]: `./${baseCompName}`,
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
      this.generateConfigFile(compilation, customWrapperName, {
        component: true,
        usingComponents: {
          [baseCompName]: `./${baseCompName}`,
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
    } else {
      this.generateConfigFile(compilation, customWrapperName, {
        component: true,
        usingComponents: {
          [customWrapperName]: `./${customWrapperName}`,
        },
      });
    }
    this.generateTemplateFile(compilation, baseTemplateName, template.buildTemplate, componentConfig);
    this.generateTemplateFile(compilation, customWrapperName, template.buildCustomComponentTemplate, this.options.fileType.templ);
    this.generateXSFile(compilation, 'utils');
    this.components.forEach(component => {
      const importBaseTemplatePath = promoteRelativePath(path.relative(component.path, path.join(sourceDir, this.getTemplatePath(baseTemplateName))));
      const config = this.filesConfig[this.getConfigFilePath(component.name)];
      if (config) {
        this.generateConfigFile(compilation, component.path, config.content);
      }
      if (!component.isNative) {
        this.generateTemplateFile(compilation, component.path, template.buildPageTemplate, importBaseTemplatePath);
      }
    });
    this.pages.forEach(page => {
      let importBaseTemplatePath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTemplatePath(baseTemplateName))));
      const config = this.filesConfig[this.getConfigFilePath(page.name)];
      let isIndependent = false;
      let independentName = '';
      if (config) {
        let importBaseCompPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTargetFilePath(baseCompName, ''))));
        let importCustomWrapperPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTargetFilePath(customWrapperName, ''))));
        if (isIndependent) {
          importBaseCompPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, independentName, this.getTargetFilePath(baseCompName, ''))));
          importCustomWrapperPath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, independentName, this.getTargetFilePath(customWrapperName, ''))));
        }
        config.content.usingComponents = {
          [customWrapperName]: importCustomWrapperPath,
          ...config.content.usingComponents,
        };
        if (!template.isSupportRecursive && !page.isNative) {
          config.content.usingComponents[baseCompName] = importBaseCompPath;
        }
        this.generateConfigFile(compilation, page.path, config.content);
      }
      if (!page.isNative) {
        this.generateTemplateFile(compilation, page.path, template.buildPageTemplate, importBaseTemplatePath);
      }
    });
    this.generateTabBarFiles(compilation);
    this.injectCommonStyles(compilation);
    if (this.themeLocation) {
      this.generateDarkModeFile(compilation);
    }
    if (typeof modifyBuildAssets === 'function') {
      await modifyBuildAssets(compilation.assets, this);
    }
  }

  generateConfigFile(compilation: webpack.Compilation, filePath: string, config: Config & { component?: boolean }) {
    const fileConfigName = this.getConfigPath(this.getComponentName(filePath));
    const unOfficalConfigs = ['enableShareAppMessage', 'enableShareTimeline', 'components'];
    unOfficalConfigs.forEach(item => {
      delete config[item];
    });
    const fileConfigStr = JSON.stringify(config);
    compilation.assets[fileConfigName] = new RawSource(fileConfigStr);
  }

  generateTemplateFile(compilation: webpack.Compilation, filePath: string, templateFn: (...args) => string, ...options) {
    let templStr = templateFn(...options);
    const fileTemplName = this.getTemplatePath(this.getComponentName(filePath));

    if (this.options.minifyXML?.collapseWhitespace) {
      templStr = minify(templStr, {
        collapseWhitespace: true,
        keepClosingSlash: true,
      });
    }

    compilation.assets[fileTemplName] = new RawSource(templStr);
  }

  generateXSFile(compilation: webpack.Compilation, xsPath) {
    debugger;
    const ext = this.options.fileType.xs;
    if (ext == null) {
      return;
    }

    const xs = this.options.template.buildXScript();
    const fileXsName = this.getTargetFilePath(xsPath, ext);
    const filePath = fileXsName;
    compilation.assets[filePath] = new RawSource(xs);
  }

  getComponentName(componentPath: string) {
    let componentName: string;
    if (NODE_MODULES_REG.test(componentPath)) {
      componentName = componentPath.replace(this.context, '').replace(/\\/g, '/').replace(path.extname(componentPath), '');
      componentName = componentName.replace(/node_modules/gi, 'npm');
    } else {
      componentName = componentPath.replace(this.options.sourceDir, '').replace(/\\/g, '/').replace(path.extname(componentPath), '');
    }

    return componentName.replace(/^(\/|\\)/, '');
  }

  /**
   * 根据 app、页面、组件的路径获取对应的 config 配置文件的路径
   * @returns config 的路径
   */
  getConfigFilePath(filePath: string) {
    return resolveMainFilePath(`${filePath.replace(path.extname(filePath), '')}.config`);
  }

  /** 处理 xml 文件后缀 */
  getTemplatePath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.templ);
  }

  /** 处理样式文件后缀 */
  getStylePath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.style);
  }

  /** 处理 config 文件后缀 */
  getConfigPath(filePath: string) {
    return this.getTargetFilePath(filePath, this.options.fileType.config);
  }

  /** 处理 extname */
  getTargetFilePath(filePath: string, targetExtname: string) {
    const extname = path.extname(filePath);
    if (extname) {
      return filePath.replace(extname, targetExtname);
    }
    return filePath + targetExtname;
  }

  /**
   * 输出 themeLocation 文件
   * @param compilation
   */
  generateDarkModeFile(compilation: webpack.Compilation) {
    const themeLocationPath = path.resolve(this.options.sourceDir, this.themeLocation);
    if (fs.existsSync(themeLocationPath)) {
      const themeLocationSource = fs.readFileSync(themeLocationPath);
      compilation.assets[this.themeLocation] = new RawSource(themeLocationSource);
    }
  }

  /**
   * 输出 tabbar icons 文件
   */
  generateTabBarFiles(compilation: webpack.Compilation) {
    this.tabBarIcons.forEach(icon => {
      const iconPath = path.resolve(this.options.sourceDir, icon);
      if (fs.existsSync(iconPath)) {
        const iconSource = fs.readFileSync(iconPath);
        compilation.assets[icon] = new RawSource(iconSource);
      }
    });
  }

  /**
   * 小程序全局样式文件中引入 common chunks 中的公共样式文件
   */
  injectCommonStyles({ assets }: webpack.Compilation) {
    const styleExt = this.options.fileType.style;
    const appStyle = `app${styleExt}`;
    const REG_STYLE_EXT = new RegExp(`\\.(${styleExt.replace('.', '')})(\\?.*)?$`);

    if (!assets[appStyle]) return;

    const originSource = assets[appStyle];
    const source = new ConcatSource(originSource);

    Object.keys(assets).forEach(assetName => {
      const fileName = path.basename(assetName, path.extname(assetName));
      if ((REG_STYLE.test(assetName) || REG_STYLE_EXT.test(assetName)) && this.options.commonChunks.includes(fileName)) {
        source.add('\n');
        source.add(`@import ${JSON.stringify(urlToRequest(assetName))};`);
        assets[appStyle] = source;
      }
    });
  }

  addTarBarFilesToDependencies(compilation: webpack.Compilation) {
    const { fileDependencies, missingDependencies } = compilation;
    this.tabBarIcons.forEach(icon => {
      if (!fileDependencies.has(icon)) {
        fileDependencies.add(icon);
      }
      // 避免触发 watchpack 里 WatchpackFileWatcher 类的 "initial-missing" 事件中 _onRemove 逻辑，
      // 它会把 tabbar icon 当做已 remove 多次触发构建
      if (!missingDependencies.has(icon)) {
        missingDependencies.add(icon);
      }
    });
  }
}
