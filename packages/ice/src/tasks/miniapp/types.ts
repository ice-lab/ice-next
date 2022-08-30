import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Configuration } from 'webpack';
import type { Config } from '@ice/types';

export interface IMiniappConfig {
  rootDir: string;
  template: any;
  fileType: any;
  getAppConfig: (exportNamse?: string[]) => Promise<any>;
  getRoutesConfig: (specifyRoutId?: string) => Promise<any>;
}

export interface IComponent {
  name: string;
  path: string;
  isNative: boolean;
  stylePath?: string;
  templatePath?: string;
}

export interface IFileType {
  templ: string;
  style: string;
  config: string;
  script: string;
  xs?: string;
}
export interface IPlatformConfig {
  globalObject: string;
  projectConfigJson?: string;
  fileType: IFileType;
  template: RecursiveTemplate | UnRecursiveTemplate;
}

export interface IMiniappWebpackOptions {
  rootDir: string;
  env?: Record<string, string>;
  template: IPlatformConfig['template'];
  fileType: IPlatformConfig['fileType'];
  getAppConfig: Config['getAppConfig'];
  getRoutesConfig: Config['getRoutesConfig'];
}

export type IMiniappWebpackConfig = Pick<Configuration, 'plugins' | 'module'>;
