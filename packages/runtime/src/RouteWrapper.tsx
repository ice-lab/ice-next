import * as React from 'react';
import type { RouteWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { DataProvider, ConfigProvider } from './RouteContext.js';

interface Props {
  RouteComponent: React.ComponentType<any>;
  RouteWrappers?: RouteWrapper[];
  id: string;
}

export default function RouteWrapper(props: Props) {
  const { RouteComponent, RouteWrappers, id } = props;
  const { routesData, routesConfig } = useAppContext();

  const Wrapper = RouteWrappers.reduce((PreWrapper, CurrentWrapper) => {
    return ({ children, ...rest }) => {
      return (
        <CurrentWrapper {...rest}>
          <PreWrapper>
            {children}
          </PreWrapper>
        </CurrentWrapper>
      );
    };
  });

  return (
    <DataProvider value={routesData[id]}>
      <ConfigProvider value={routesConfig[id]}>
        <Wrapper>
          <RouteComponent />
        </Wrapper>
      </ConfigProvider>
    </DataProvider>
  );
}