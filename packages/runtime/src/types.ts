import type { IncomingMessage, ServerResponse } from 'http';
import type { Action, Location } from 'history';
import type { ComponentType, ReactNode, PropsWithChildren } from 'react';
import type { HydrationOptions } from 'react-dom/client';
import type { Navigator, Params } from 'react-router-dom';
import type { useConfig, useData } from './RouteContext.js';

type VoidFunction = () => void;
type AppLifecycle = 'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick';
type App = Partial<{
  rootId: string;
  strict: boolean;
  errorBoundary: boolean;
} & Record<AppLifecycle, VoidFunction>>;

export type AppData = any;
export type RouteData = any;

// route.getConfig return value
export interface RouteConfig {
  title?: string;
  // TODO: fix type
  meta?: any[];
  links?: any[];
  scripts?: any[];

  // plugin extends
  auth?: string[];
}

export interface AppExport {
  default?: AppConfig;
  [key: string]: any;
}

// app.getData & route.getData
export type GetData = (ctx: RequestContext) => Promise<RouteData> | RouteData;
export type GetServerData = (ctx: RequestContext) => Promise<RouteData> | RouteData;
export type GetStaticData = (ctx: RequestContext) => Promise<RouteData> | RouteData;
// route.getConfig
export type GetConfig = (args: { data: RouteData }) => RouteConfig;

export interface AppConfig extends Record<string, any> {
  app?: App;
  router?: {
    type?: 'hash' | 'browser';
    basename?: string;
  };
}

export interface RoutesConfig {
  [routeId: string]: RouteConfig;
}

export interface RoutesData {
  [routeId: string]: RouteData;
}

// useAppContext
export interface AppContext {
  appConfig: AppConfig;
  assetsManifest: AssetsManifest;
  routesData: RoutesData;
  routesConfig: RoutesConfig;
  routeModules: RouteModules;
  matches?: RouteMatch[];
  routes?: RouteItem[];
  documentOnly?: boolean;
  matchedIds?: string[];
  appExport?: AppExport;
  basename?: string;
}

export type Renderer = (
  container: Element | Document,
  initialChildren: React.ReactNode,
  options?: HydrationOptions,
) => void;

export interface ServerContext {
  req?: IncomingMessage;
  res?: ServerResponse;
}

export interface RequestContext extends ServerContext {
  pathname: string;
  query: Record<string, any>;
}

export interface RouteComponent {
  default: ComponentType<any>;
  getStaticData?: GetStaticData;
  getServerData?: GetServerData;
  getData?: GetData;
  getConfig?: GetConfig;
}

export interface RouteItem {
  id: string;
  path: string;
  element?: ReactNode;
  componentName: string;
  index?: boolean;
  exact?: boolean;
  strict?: boolean;
  load?: () => Promise<RouteComponent>;
  children?: RouteItem[];
  layout?: boolean;
}

export type ComponentWithChildren<P = {}> = ComponentType<PropsWithChildren<P>>;

export interface RouteWrapperConfig {
  Wrapper: RouteWrapper;
  layout?: boolean;
}

export type AppProvider = ComponentWithChildren<any>;
export type RouteWrapper = ComponentType<any>;

export type SetAppRouter = (AppRouter: ComponentType<AppRouterProps>) => void;
export type AddProvider = (Provider: AppProvider) => void;
export type SetRender = (render: Renderer) => void;
export type AddWrapper = (wrapper: RouteWrapper, forLayout?: boolean) => void;

export interface RouteModules {
  [routeId: string]: RouteComponent;
}

export interface AssetsManifest {
  publicPath: string;
  entries: string[];
  pages: string[];
  assets?: {
    [assetPath: string]: string;
  };
}

export interface RuntimeAPI {
  setAppRouter: SetAppRouter;
  addProvider: AddProvider;
  setRender: SetRender;
  addWrapper: AddWrapper;
  appContext: AppContext;
  useData: typeof useData;
  useConfig: typeof useConfig;
}

export interface RuntimePlugin {
  (
    apis: RuntimeAPI
  ): Promise<void> | void;
}

export interface CommonJsRuntime {
  default: RuntimePlugin;
}

export type RuntimeModules = (RuntimePlugin | CommonJsRuntime)[];

export interface AppRouterProps {
  action: Action;
  location: Location;
  navigator: Navigator;
  routes: RouteItem[];
  static?: boolean;
  basename?: string;
}

export interface AppRouteProps {
  routes: RouteItem[];
}

// rewrite the `RouteMatch` type which is referenced by the react-router-dom
export interface RouteMatch {
  /**
   * The names and values of dynamic parameters in the URL.
   */
  params: Params;
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The portion of the URL pathname that was matched before child routes.
   */
  pathnameBase: string;
  /**
   * The route object that was used to match.
   */
  route: RouteItem;
}

export type RenderMode = 'SSR' | 'SSG';