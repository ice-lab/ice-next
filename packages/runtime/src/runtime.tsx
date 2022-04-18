import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { ComponentType } from 'react';
import type {
  Renderer,
  AppContext,
  RuntimePlugin,
  CommonJsRuntime,
  RuntimeAPI,
  SetAppRouter,
  AddProvider,
  AddWrapper,
  RouteWrapper,
  SetRender,
  AppRouterProps,
} from './types.js';
import DefaultAppRouter from './AppRouter.js';
import { useData, useConfig } from './RouteContext.js';

class Runtime {
  private appContext: AppContext;

  private AppRouter: ComponentType<AppRouterProps>;

  private AppProvider: ComponentType[];

  private RouteWrappers: RouteWrapper[];

  private render: Renderer;

  public constructor(appContext: AppContext) {
    this.AppProvider = [];
    this.appContext = appContext;
    this.render = ReactDOM.render;
    this.AppRouter = DefaultAppRouter;
    this.RouteWrappers = [];
  }

  public getAppContext = () => this.appContext;

  public getRender = () => {
    return ReactDOM.hydrate;
  };

  public getAppRouter = () => this.AppRouter;

  public getWrappers = () => this.RouteWrappers;

  public loadModule(module: RuntimePlugin | CommonJsRuntime) {
    let runtimeAPI: RuntimeAPI = {
      addProvider: this.addProvider,
      setRender: this.setRender,
      addWrapper: this.addWrapper,
      appContext: this.appContext,
      setAppRouter: this.setAppRouter,
      useData,
      useConfig,
    };

    const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
    if (module) runtimeModule(runtimeAPI);
  }

  public composeAppProvider() {
    if (!this.AppProvider.length) return null;
    return this.AppProvider.reduce((ProviderComponent, CurrentProvider) => {
      return ({ children, ...rest }) => {
        const element = CurrentProvider
          ? <CurrentProvider {...rest}>{children}</CurrentProvider>
          : children;
        return <ProviderComponent {...rest}>{element}</ProviderComponent>;
      };
    });
  }

  private addProvider: AddProvider = (Provider) => {
    // must promise user's providers are wrapped by the plugins' providers
    this.AppProvider.unshift(Provider);
  };

  private setRender: SetRender = (render) => {
    this.render = render;
  };

  private addWrapper: AddWrapper = (Wrapper, options = {}) => {
    this.RouteWrappers.push({
      Wrapper,
      layout: options.layout,
    });
  };

  // for plugin-icestark
  public setAppRouter: SetAppRouter = (AppRouter) => {
    this.AppRouter = AppRouter;
  };
}

export default Runtime;