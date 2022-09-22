import * as React from 'react';
import type { RuntimePlugin, RouteWrapper, AppProvider } from '@ice/types';
import { AliveScope, KeepAlive } from 'react-activation';

const runtime: RuntimePlugin = ({ useConfig, addProvider, addWrapper }) => {
  const KeepAliveProvider: AppProvider = ({ children }) => {
    return <AliveScope>{children}</AliveScope>;
  };
  addProvider(KeepAliveProvider);

  const KeepAliveRouteWrapper: RouteWrapper = ({ children, routeId }) => {
    const routeConfig = useConfig() || {};
    // @ts-expect-error routeConfig type
    const { keepAlive } = routeConfig;
    if (keepAlive === false) {
      return <>{children}</>;
    } else {
      return (
        <KeepAlive cacheKey={routeId}>
          {children}
        </KeepAlive>
      );
    }
  };
  addWrapper(KeepAliveRouteWrapper);
};

export default runtime;
