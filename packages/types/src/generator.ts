export interface IdentifierData {
  specifier: string | string[];
  source: string;
  type?: boolean;
  alias?: Record<string, string>;
}

export type RenderData = Record<string, unknown>;
type RenderDataFunction = (renderDataFunction: RenderData) => RenderData;
export interface TemplateOptions {
  template: string;
  targetDir: string;
}
export type ExtraData = RenderData | RenderDataFunction;
export type RenderTemplate = [string, string, ExtraData];
export interface RenderDataRegistration {
  (renderDataFunction: RenderData): RenderData;
}
export interface Registration {
  [key: string]: any[];
}

export type SetPlugins = (plugins: any) => void;
export type AddIdentifier = (registerKey: string, identifierData: IdentifierData | IdentifierData[]) => void;
export type RemoveIdentifier = (registerKey: string, removeSource: string | string[]) => void;
export type AddContent = (apiName: string, ...args: any) => void;
export type GetExportData = (registerKey: string, dataKeys: string[]) => {
  imports?: string;
  exports?: string;
  exportNames?: string[];
  [x: string]: any;
};
export type ParseRenderData = () => Record<string, unknown>;
export type Render = () => void;
export type ModifyRenderData = (registration: RenderDataRegistration) => void;
export type AddDataLoaderImport = (identifierData: IdentifierData) => void;
export type AddRenderFile = (templatePath: string, targetPath: string, extraData?: ExtraData) => void;
export type AddTemplateFiles = (templateOptions: string | TemplateOptions, extraData?: ExtraData) => void;
export type RenderFile = (templatePath: string, targetPath: string, extraData?: ExtraData) => void;
