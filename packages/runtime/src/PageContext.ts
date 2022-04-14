import * as React from 'react';
import type { PageData, PageConfig } from './types';

const DataContext = React.createContext<PageData | undefined>(undefined);
DataContext.displayName = 'Data';

function useData <T = PageData>(): T {
  const value = React.useContext(DataContext);
  return value;
}
const DataProvider = DataContext.Provider;


const ConfigContext = React.createContext<PageConfig | undefined>(undefined);
ConfigContext.displayName = 'Config';

function useConfig(): PageConfig {
  const value = React.useContext(ConfigContext);
  return value;
}
const ConfigProvider = ConfigContext.Provider;

export {
  useData,
  DataProvider,

  useConfig,
  ConfigProvider,
};
