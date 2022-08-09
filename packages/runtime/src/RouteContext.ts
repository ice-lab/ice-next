import * as React from 'react';
import type { RouteData, RouteConfig, RouteComponent } from './types.js';

const RouteModuleContext = React.createContext<RouteComponent | undefined>(undefined);
RouteModuleContext.displayName = 'RouteModule';
function useRouteModule(): RouteComponent {
  const value = React.useContext(RouteModuleContext);
  return value;
}
const RouteModuleProvider = RouteModuleContext.Provider;

const DataContext = React.createContext<RouteData | undefined>(undefined);
DataContext.displayName = 'Data';

function useData(): RouteData {
  const value = React.useContext(DataContext);
  return value;
}
const DataProvider = DataContext.Provider;

const ConfigContext = React.createContext<RouteConfig | undefined>(undefined);
ConfigContext.displayName = 'Config';

function useConfig(): RouteConfig {
  const value = React.useContext(ConfigContext);
  return value;
}
const ConfigProvider = ConfigContext.Provider;

export {
  useRouteModule,
  RouteModuleProvider,

  useData,
  DataProvider,

  useConfig,
  ConfigProvider,
};
