import type webpack from 'webpack';
import type { IPluginAPI, CommandArgs } from 'build-scripts';
import type { Configuration, Stats } from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import type { BuildOptions, BuildResult } from 'esbuild';
import type { Config } from './config.js';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator.js';
import type { NestedRouteManifest } from '@ice/route-manifest';

type AddExport = (exportData: ExportData) => void;
type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
export type EsbuildCompile = (buildOptions: BuildOptions, customConfig?: Partial<Config>) => Promise<BuildResult>;
export type WatchEvent = [
  pattern: RegExp | string,
  event: (eventName: EventName, filePath: string) => void,
  name?: string,
];

export interface Urls {
  lanUrlForConfig: any;
  lanUrlForTerminal: string;
  localUrlForTerminal: string;
  localUrlForBrowser: string;
}

interface BeforeCommandRunOptions {
  commandArgs: CommandArgs;
  webpackConfigs: Configuration | Configuration[];
  taskConfig: Config;
  esbuildCompile: EsbuildCompile;
}

interface AfterCommandCompileOptions {
  stats: Stats;
  messages: { warnings: any[]; errors: any[] };
  isSuccessful: Boolean;
  isFirstCompile: Boolean;
  urls: Urls;
}

export interface HookLifecycle {
  'before.start.run': BeforeCommandRunOptions;
  'before.build.run': BeforeCommandRunOptions;
  'after.start.compile': AfterCommandCompileOptions;
  'after.build.compile': AfterCommandCompileOptions;
  'after.start.devServer': {
    urls: Urls;
    devServer: WebpackDevServer;
  };
}

export type ApplyHook = <T extends keyof HookLifecycle>(lifecycle: T, args: HookLifecycle[T]) => void;
type OnHook = <T extends keyof HookLifecycle>(lifecycle: T, callback: (args: HookLifecycle[T]) => void) => void;

export type Routes = NestedRouteManifest[];

export interface ExtendsPluginAPI {
  context: {
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
    addEvent?: (watchEvent: WatchEvent) => void;
    removeEvent?: (name: string) => void;
  };
}

interface OverwritePluginAPI extends ExtendsPluginAPI {
  onHook: OnHook;
}

export interface Plugin<T = undefined> {
  (api: IPluginAPI<Config, OverwritePluginAPI>, options?: T): Promise<void> | void;
}