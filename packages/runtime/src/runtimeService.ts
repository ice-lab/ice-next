import type { ComponentType, createElement } from 'react';

type App = Partial<{
  rootId?: string;
  strict?: boolean;
  renderComponent?: ComponentType & {
    __pageConfig?: {
      source?: string;
      path?: string;
      name?: string;
      [key: string]: any;
    };
  };
} & Record<'onShow' | 'onHide' | 'onPageNotFound' | 'onShareAppMessage' | 'onUnhandledRejection' | 'onLaunch' | 'onError' | 'onTabItemClick', VoidFunction>>;

export interface AppConfig extends Record<string, any> {
  app?: App;
  router?: {
    type?: 'hash' | 'browser' | 'memory' | 'static';
    history?: History;
    basename?: string;
  };
}

export type BuildConfig = Record<string, any>;

export type ReactCreateElement = typeof createElement;

export interface Context {
  createElement?: ReactCreateElement;
  enableRouter?: boolean;
  staticConfig?: any;
}

type PageComponent = boolean | ComponentType;
// simplify page item type while it has been defined in plugin-router
interface PageItem {
  [key: string]: any;
}
type PageType = PageItem[];
interface ModifyFn {
  (routes: PageType): PageType;
}
interface DOMRender {
  ({ App, appMountNode }: { App: React.ComponentType; appMountNode?: HTMLElement }): void;
}
interface APIRegistration {
  [key: string]: Function;
}
interface InternalValue {
  [key: string]: any;
}

type RegisterRuntimeAPI = (key: string, api: Function) => void;
type SetRuntimeValue = (key: string, value: unknown) => void;
type GetRuntimeValue = <T>(key: string) => T;
type ApplyRuntimeAPI = <T>(key: string, ...args: any) => T;
type PageWrapper<InjectProps> = (<Props>(Component: React.ComponentType<Props & InjectProps>) => ComponentType<Props>);
type RenderApp = (page?: PageType | ComponentType, PageComponent?: PageComponent) => ComponentType;
type WrapperRender = (renderRouter: RenderApp) => RenderApp;

type SetRenderApp = (renderApp: RenderApp) => void;
type AddProvider = (Provider: React.ComponentType) => void;
type AddDOMRender = (domRender: DOMRender) => void;
type ModifyRoutes = (modifyFn: ModifyFn) => void;
type WrapperPageComponent = (pageWrapper: PageWrapper<any>) => void;
type WrapperRouterRender = (wrapper: WrapperRender) => void;
type ModifyRoutesComponent = (modify: (routesComponent: PageComponent) => PageComponent) => void;
interface CommonJsRuntime {
  default: RuntimePlugin;
}

type GetAppComponent = () => React.ComponentType;
type GetWrapperPageRegistration = () => PageWrapper<any>[];

export interface RuntimeAPI {
  setRenderApp?: SetRenderApp;
  addProvider: AddProvider;
  addDOMRender: AddDOMRender;
  modifyRoutes?: ModifyRoutes;
  wrapperRouterRender?: WrapperRouterRender;
  modifyRoutesComponent?: ModifyRoutesComponent;
  wrapperPageComponent?: WrapperPageComponent;
  applyRuntimeAPI: ApplyRuntimeAPI;
  appConfig: AppConfig;
  buildConfig: BuildConfig;
  context: Context;
  staticConfig: any;
  getRuntimeValue: GetRuntimeValue;
}

export interface RuntimePlugin {
  (
    apis: RuntimeAPI
  ): void;
}

class RuntimeService {
  private appConfig: AppConfig;

  private buildConfig: BuildConfig;

  private context: Context;

  private staticConfig: any;

  private renderApp: RenderApp;

  private AppProvider: React.ComponentType[];

  private modifyRoutesRegistration: ModifyFn[];

  private wrapperPageRegistration: PageWrapper<any>[];

  private routesComponent: PageComponent;

  private apiRegistration: APIRegistration;

  private internalValue: InternalValue;

  public modifyDOMRender: DOMRender;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(appConfig: AppConfig, buildConfig: BuildConfig, context: Context) {
    this.AppProvider = [];
    this.appConfig = appConfig;
    this.buildConfig = buildConfig;
    this.context = context;
    // Rax App 里的 app.json
    this.staticConfig = context?.staticConfig;
    this.modifyDOMRender = null;
    this.apiRegistration = {};
    this.internalValue = {};
    this.renderApp = () => null;
    this.routesComponent = false;
    this.modifyRoutesRegistration = [];
    this.wrapperPageRegistration = [];
  }

  public getAppConfig = () => this.appConfig;

  public loadModule(module: RuntimePlugin | CommonJsRuntime) {
    const enableRouter = this.getRuntimeValue('enableRouter');
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      addDOMRender: this.addDOMRender,
      applyRuntimeAPI: this.applyRuntimeAPI,
      wrapperPageComponent: this.wrapperPageComponent,
      appConfig: this.appConfig,
      buildConfig: this.buildConfig,
      context: this.context,
      setRenderApp: this.setRenderApp,
      staticConfig: this.staticConfig,
      getRuntimeValue: this.getRuntimeValue,
    };

    if (enableRouter) {
      runtimeAPI = {
        ...runtimeAPI,
        modifyRoutes: this.modifyRoutes,
        wrapperRouterRender: this.wrapperRouterRender,
        modifyRoutesComponent: this.modifyRoutesComponent,
      };
    }
    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) runtimeModule(runtimeAPI);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? this.context.createElement(CurrentProvider, { ...rest }, children)
          : children;
        return this.context.createElement(
          ProviderComponent,
          { ...rest },
          element,
        );
      };
    });
  }

  public registerRuntimeAPI: RegisterRuntimeAPI = (key, api) => {
    if (this.apiRegistration[key]) {
      console.warn(`api ${key} had already been registered`);
    } else {
      this.apiRegistration[key] = api;
    }
  };

  private applyRuntimeAPI: ApplyRuntimeAPI = (key, ...args) => {
    if (!this.apiRegistration[key]) {
      console.warn(`unknown api ${key}`);
      return;
    }
    return this.apiRegistration[key](...args);
  };

  public setRuntimeValue: SetRuntimeValue = (key, value) => {
    if (Object.prototype.hasOwnProperty.call(this.internalValue, key)) {
      console.warn(`internal value ${key} had already been registered`);
    } else {
      this.internalValue[key] = value;
    }
  };

  public getRuntimeValue: GetRuntimeValue = (key) => {
    return this.internalValue[key];
  };

  // plugin-router 会调用
  private setRenderApp: SetRenderApp = (renderRouter) => {
    this.renderApp = renderRouter;
  };

  // plugin-icestark 会调用
  private wrapperRouterRender: WrapperRouterRender = (wrapper) => {
    // pass origin router render for custom requirement
    this.renderApp = wrapper(this.renderApp);
  };

  private addProvider: AddProvider = (Provider) => {
    // must promise user's providers are wrapped by the plugins' providers
    this.AppProvider.unshift(Provider);
  };

  private addDOMRender: AddDOMRender = (render) => {
    this.modifyDOMRender = render;
  };

  private modifyRoutes: ModifyRoutes = (modifyFn) => {
    this.modifyRoutesRegistration.push(modifyFn);
  };

  private modifyRoutesComponent: ModifyRoutesComponent = (modify) => {
    this.routesComponent = modify(this.routesComponent);
  };

  private wrapperPageComponent: WrapperPageComponent = (wrapperPage) => {
    this.wrapperPageRegistration.push(wrapperPage);
  };

  private wrapperRoutes = (routes: PageType) => {
    return routes.map((item) => {
      if (item.children) {
        item.children = this.wrapperRoutes(item.children);
      } else if (item.component) {
        item.routeWrappers = this.wrapperPageRegistration;
      }
      return item;
    });
  };

  public getWrapperPageRegistration: GetWrapperPageRegistration = () => {
    return this.wrapperPageRegistration;
  };

  public getAppComponent: GetAppComponent = () => {
    // 表示是否启用 plugin-router runtime，何时不启用：1. SPA + router: false 2. MPA + 对应 pages 文件下面没有 routes.[j|t]s 这个文件
    const enableRouter = this.getRuntimeValue('enableRouter');

    if (enableRouter) {
      const routes = this.wrapperRoutes(this.modifyRoutesRegistration.reduce((acc: PageType, curr) => {
        return curr(acc);
      }, []));
      // renderApp define by plugin-router
      return this.renderApp(routes, this.routesComponent);
    } else {
      // 通过 appConfig.app.renderComponent 渲染
      const renderComponent = this.appConfig.app?.renderComponent;
      // default renderApp
      return this.renderApp(this.wrapperPageRegistration.reduce((acc: any, curr: any) => {
        const compose = curr(acc);
        if (acc.pageConfig) {
          compose.pageConfig = acc.pageConfig;
        }
        if (acc.getInitialProps) {
          compose.getInitialProps = acc.getInitialProps;
        }
        return compose;
      }, renderComponent));
    }
  };
}

export default RuntimeService;
