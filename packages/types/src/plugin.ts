import type webpack from 'webpack';
import type { IPluginAPI } from 'build-scripts';
import type { Config } from './config.js';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator.js';

type AddExport = (exportData: ExportData) => void;

export interface RouteItem {
  path: string;
  filepath: string;
  chunkName: string;
  componentName: string;
}

export type Routes = RouteItem[];

export interface ExtendsPluginAPI {
  context: {
    routes: Routes;
    webpack?: typeof webpack;
  };
  generator: {
    addExport: AddExport;
    addExportTypes: AddExport;
    addConfigTypes: AddExport;
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
  };
}

export interface Plugin<T = undefined> {
  (api: IPluginAPI<Config, ExtendsPluginAPI>, options?: T): Promise<void> | void;
}