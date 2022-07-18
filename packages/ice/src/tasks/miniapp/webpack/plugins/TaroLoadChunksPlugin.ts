import path from 'path';
import taroHelper from '@tarojs/helper';
import { toDashed } from '@tarojs/shared';
import webpack from '@ice/bundles/compiled/webpack/index.js';

import webpackSources from 'webpack-sources';

import { componentConfig } from '../template/component.js';
import type { AddPageChunks, IComponent } from '../utils/types.js';
import { getChunkEntryModule } from '../utils/webpack.js';
import type TaroNormalModule from './TaroNormalModule.js';

const { ConcatSource, Source } = webpackSources;
const {
  META_TYPE,
  promoteRelativePath,
  taroJsComponents,
} = taroHelper;
const PLUGIN_NAME = 'TaroLoadChunksPlugin';

interface IOptions {
  commonChunks: string[];
  framework: string;
  addChunkPages?: AddPageChunks;
  pages: Set<IComponent>;
  needAddCommon?: string[];
  isIndependentPackages?: boolean;
}

export default class TaroLoadChunksPlugin {
  commonChunks: string[];
  framework: string;
  addChunkPages?: AddPageChunks;
  pages: Set<IComponent>;
  isCompDepsFound: boolean;
  needAddCommon: string[];
  isIndependentPackages: boolean;

  constructor(options: IOptions) {
    this.commonChunks = options.commonChunks;
    this.framework = options.framework;
    this.addChunkPages = options.addChunkPages;
    this.pages = options.pages;
    this.needAddCommon = options.needAddCommon || [];
    this.isIndependentPackages = options.isIndependentPackages || false;
  }

  apply(compiler: webpack.Compiler) {
    const pagesList = this.pages;
    const addChunkPagesList = new Map<string, string[]>();
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: webpack.Compilation) => {
      let commonChunks;
      const fileChunks = new Map<string, { name: string }[]>();

      compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks: webpack.Chunk[]) => {
        const chunksArray = Array.from(chunks);
        /**
         * 收集 common chunks 中使用到 @tarojs/components 中的组件
         */
        commonChunks = chunksArray.filter(chunk => this.commonChunks.includes(chunk.name) && chunkHasJs(chunk, compilation.chunkGraph)).reverse();

        this.isCompDepsFound = false;
        for (const chunk of commonChunks) {
          this.collectComponents(compilation, chunk);
        }
        if (!this.isCompDepsFound) {
          // common chunks 找不到再去别的 chunk 中找
          chunksArray
            .filter(chunk => !this.commonChunks.includes(chunk.name))
            .some(chunk => {
              this.collectComponents(compilation, chunk);
              return this.isCompDepsFound;
            });
        }

        /**
         * 收集开发者在 addChunkPages 中配置的页面及其需要引用的公共文件
         */
        if (typeof this.addChunkPages === 'function') {
          this.addChunkPages(addChunkPagesList, Array.from(pagesList).map(item => item.name));
          chunksArray.forEach(chunk => {
            const id = getIdOrName(chunk);
            addChunkPagesList.forEach((deps, pageName) => {
              if (pageName === id) {
                const depChunks = deps.map(dep => ({ name: dep }));
                fileChunks.set(id, depChunks);
              }
            });
          });
        }
      });

      webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules: typeof ConcatSource, { chunk }) => {
        const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any;
        if (chunkEntryModule) {
          const entryModule: TaroNormalModule = chunkEntryModule.rootModule ?? chunkEntryModule;
          if (entryModule.miniType === META_TYPE.EXPORTS) {
            const source = new ConcatSource();
            source.add('module.exports=');
            source.add(modules);
            return source;
          } else {
            return modules;
          }
        } else {
          return modules;
        }
      });

      /**
       * 在每个 chunk 文本刚生成后，按判断条件在文本头部插入 require 语句
       */
      webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules: typeof ConcatSource, { chunk }) => {
        const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any;
        if (chunkEntryModule) {
          const entryModule: TaroNormalModule = chunkEntryModule.rootModule ?? chunkEntryModule;
          const { miniType } = entryModule;
          if (this.needAddCommon.length) {
            for (const item of this.needAddCommon) {
              if (getIdOrName(chunk) === item) {
                return addRequireToSource(item, modules, commonChunks);
              }
            }
          }

          if (miniType === META_TYPE.ENTRY) {
            return addRequireToSource(getIdOrName(chunk), modules, commonChunks);
          }

          if (this.isIndependentPackages &&
            (miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
          ) {
            return addRequireToSource(getIdOrName(chunk), modules, commonChunks);
          }

          // addChunkPages
          if (fileChunks.size &&
            (miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
          ) {
            let source;
            const id = getIdOrName(chunk);
            fileChunks.forEach((v, k) => {
              if (k === id) {
                source = addRequireToSource(id, modules, v);
              }
            });
            return source;
          }
        } else {
          return modules;
        }
      });
    });
  }

  collectComponents(compilation: webpack.Compilation, chunk: webpack.Chunk) {
    const { chunkGraph } = compilation;
    const { moduleGraph } = compilation;
    const modulesIterable: Iterable<TaroNormalModule> = chunkGraph.getOrderedChunkModulesIterable(chunk, webpack.util.comparators.compareModulesByIdentifier) as any;
    for (const module of modulesIterable) {
      if (module.rawRequest === taroJsComponents) {
        this.isCompDepsFound = true;
        const { includes } = componentConfig;
        const moduleUsedExports = moduleGraph.getUsedExports(module, undefined);
        if (moduleUsedExports === null || typeof moduleUsedExports === 'boolean') {
          componentConfig.includeAll = true;
        } else {
          for (const item of moduleUsedExports) {
            includes.add(toDashed(item));
          }
        }
        break;
      }
    }
  }
}

/**
 * @returns chunk.id || chunk.name
 */
export function getIdOrName(chunk: webpack.Chunk) {
  if (typeof chunk.id === 'string') {
    return chunk.id;
  }
  return chunk.name;
}

/**
 * 在文本头部加入一些 require 语句
 */
export function addRequireToSource(id: string, modules: any, commonChunks: (webpack.Chunk | { name: string })[]) {
  const source = new ConcatSource();
  commonChunks.forEach(chunkItem => {
    source.add(`require(${JSON.stringify(promoteRelativePath(path.relative(id, chunkItem.name)))});\n`);
  });
  source.add('\n');
  source.add(modules);
  source.add(';');
  return source;
}

function chunkHasJs(chunk: webpack.Chunk, chunkGraph: webpack.ChunkGraph) {
  if (chunk.name === chunk.runtime) return true;
  if (chunkGraph.getNumberOfEntryModules(chunk) > 0) return true;

  return Boolean(chunkGraph.getChunkModulesIterableBySourceType(chunk, 'javascript'));
}
