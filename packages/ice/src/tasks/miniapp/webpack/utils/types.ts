import type { RecursiveTemplate, UnRecursiveTemplate } from '@tarojs/shared/dist/template';
import type { IProjectBaseConfig } from '@tarojs/taro/types/compile';
import { IMiniAppConfig } from '@tarojs/taro/types/compile';
import type Webpack from 'webpack';

export interface IOption {
  [key: string]: any;
}

export interface IComponent {
  name: string;
  path: string;
  isNative: boolean;
  stylePath?: string;
  templatePath?: string;
}

export interface IComponentObj {
  name?: string;
  path: string | null;
  type?: string;
}

export interface IChain {
  [key: string]: any;
}

export interface IFileType {
  style: string;
  script: string;
  templ: string;
  config: string;
  xs?: string;
}

export type Func = (...args: any[]) => any;

export interface CommonBuildConfig extends IProjectBaseConfig {
  enableSourceMap?: boolean;
  entry?: Webpack.EntryObject;
  isWatch: boolean;
  mode: 'production' | 'development';
  port?: number;
}

// export interface MiniBuildConfig extends CommonBuildConfig, IMiniAppConfig {
//   isSupportRecursive: boolean
//   isSupportXS: boolean
//   buildAdapter: string
//   nodeModulesPath: string
//   fileType: IFileType
//   globalObject: string
//   framework: string
//   baseLevel: number
//   template: RecursiveTemplate | UnRecursiveTemplate
//   runtimePath?: string | string[]
//   taroComponentsPath?: string
//   blended?: boolean
//   hot?: boolean
// }

export type AddPageChunks = ((pages: Map<string, string[]>, pagesNames?: string[]) => void);
