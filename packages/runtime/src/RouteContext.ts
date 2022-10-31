import * as React from 'react';
import type { RouteData, RouteConfig, DataLoaderConfig } from '@ice/types';

const DataContext = React.createContext<RouteData | undefined>(undefined);
DataContext.displayName = 'Data';

function useData<T = any>(): T {
  const value = React.useContext(DataContext);
  return value;
}
const DataProvider = DataContext.Provider;

const ConfigContext = React.createContext<RouteConfig<any> | undefined>(undefined);
ConfigContext.displayName = 'Config';

function useConfig<T = {}>(): RouteConfig<T> {
  const value = React.useContext(ConfigContext);
  return value;
}
const ConfigProvider = ConfigContext.Provider;

function defineDataLoader(dataLoaderConfig: DataLoaderConfig): DataLoaderConfig {
  return dataLoaderConfig;
}

export {
  useData,
  DataProvider,
  useConfig,
  ConfigProvider,
  defineDataLoader,
};
