import type webpack from 'webpack';
import type { Plugin as _Plugin, CommandArgs, TaskConfig } from 'build-scripts';
import type { Configuration, Stats } from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import type { BuildOptions, BuildResult } from 'esbuild';
import type { DefineExtraRoutes, NestedRouteManifest } from '@ice/route-manifest';
import type { Config } from './config.js';
import type { ExportData, AddRenderFile, AddTemplateFiles } from './generator.js';
import type { AssetsManifest } from './runtime.js';

type AddExport = (exportData: ExportData) => void;
type EventName = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';

type ServerCompilerBuildOptions = Pick<BuildOptions, 'write' | 'target' | 'minify' | 'inject' | 'format' | 'entryPoints' | 'outfile' | 'bundle' | 'outdir' | 'splitting' | 'platform' | 'outExtension' | 'plugins'>;
export type ServerCompiler = (
  buildOptions: ServerCompilerBuildOptions,
  options?: {
    swc?: Config['swcOptions'];
    preBundle?: boolean;
    externalDependencies?: boolean;
    transformEnv?: boolean;
    assetsManifest?: AssetsManifest;
  }
) => Promise<Partial<BuildResult & { serverEntry: string; error: any }>>;
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

export type GetAppConfig = (exportNames?: string[]) => Promise<any>;
export type GetRoutesConfig = (specifyRoutId?: string) => Promise<any>;

interface BeforeCommandRunOptions {
  commandArgs: CommandArgs;
  webpackConfigs: Configuration | Configuration[];
  taskConfigs: TaskConfig<Config>[];
  urls?: Urls;
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  serverCompiler: ServerCompiler;
}

interface AfterCommandCompileOptions {
  stats: Stats;
  messages: { warnings: any[]; errors: any[] };
  isSuccessful: Boolean;
  isFirstCompile: Boolean;
  urls: Urls;
  taskConfigs: TaskConfig<Config>[];
  getAppConfig: GetAppConfig;
  getRoutesConfig: GetRoutesConfig;
  serverCompiler: ServerCompiler;
  webpackConfigs: Configuration | Configuration[];
}

interface DevServerInfo {
  devPath: string;
  hashChar: string;
}

export interface HookLifecycle {
  'before.start.run': BeforeCommandRunOptions;
  'before.build.run': BeforeCommandRunOptions;
  'after.start.compile': AfterCommandCompileOptions & { devUrlInfo?: DevServerInfo };
  'after.build.compile': AfterCommandCompileOptions & { serverEntryRef: { current: string } };
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
    addRenderFile: AddRenderFile;
    addRenderTemplate: AddTemplateFiles;
  };
  watch: {
    addEvent?: (watchEvent: WatchEvent) => void;
    removeEvent?: (name: string) => void;
  };
  serverCompileTask: {
    set: (task: ReturnType<ServerCompiler>) => void;
    get: () => ReturnType<ServerCompiler>;
  };
  dataCache: Map<string, string>;
  addDefineRoutesFunc: (defineRoutes: DefineExtraRoutes) => void;
}

export interface OverwritePluginAPI extends ExtendsPluginAPI {
  onHook: OnHook;
}

export type Plugin<Options = any> = (options?: Options) => _Plugin<Config, OverwritePluginAPI>;
