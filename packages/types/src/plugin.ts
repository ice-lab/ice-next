import type { Config } from './config';
import type webpack from 'webpack';
import type { IPluginAPI } from 'build-scripts';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator';

type AddExport = (exportData: ExportData) => void;
type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
export type WatchEvent = [
  pattern: RegExp | string,
  event: (eventName: EventName, filePath: string) => void,
  name?: string,
];

export interface ExtendsPluginAPI {
  context: {
    // TODO define routeManifest type
    routeManifest: any;
    webpack?: typeof webpack;
  };
  generator: {
    addExport: AddExport;
    addExportTypes: AddExport;
    addConfigTypes: AddExport;
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
  };
  watch: {
    addEvent: (watchEvent: WatchEvent) => void;
    removeEvent: (name: string) => void;
  };
}

export interface Plugin<T = undefined> {
  (api: IPluginAPI<Config, ExtendsPluginAPI>, options?: T): Promise<void> | void;
}