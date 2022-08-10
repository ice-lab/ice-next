import * as React from 'react';
import type { RuntimePlugin, AppProvider, RouteWrapper } from '@ice/types';
import type { AuthConfig, AuthType, Auth } from '../types.js';
import { AuthProvider, useAuth } from './Auth.js';
import type { InjectProps } from './Auth.js';

const runtime: RuntimePlugin = async ({ appContext, useConfig, addProvider, addWrapper }) => {
  const { appExport } = appContext;
  const authConfig: AuthConfig = (typeof appExport.auth === 'function'
    ? (await appExport.auth()) : appExport.auth) || {};
  const initialAuth = authConfig.initialAuth || {};
  const AuthProviderWrapper: AppProvider = ({ children }) => {
    const [state, setState] = React.useState<AuthType>(initialAuth);

    const updateState: InjectProps['setAuth'] = (newState = {}) => {
      setState({
        ...state,
        ...newState,
      });
    };
    return <AuthProvider value={[state, updateState]}>{children}</AuthProvider>;
  };

  const AuthRouteWrapper: RouteWrapper = ({ children }) => {
    console.log(123123);
    const [auth] = useAuth();
    const routeConfig = useConfig();
    const routeConfigAuth = routeConfig?.auth;

    if (routeConfigAuth && !Array.isArray(routeConfigAuth)) {
      throw new Error('config.auth must be an array');
    }

    const hasAuth =
      Array.isArray(routeConfigAuth) && routeConfigAuth.length
        ? Object.keys(auth).filter((item) =>
          (routeConfigAuth.includes(item) ? auth[item] : false),
        ).length
        : true;

    if (!hasAuth) {
      if (authConfig.NoAuthFallback) {
        return <authConfig.NoAuthFallback routeConfig={routeConfig} />;
      }

      return <>No Auth</>;
    }

    return <>{children}</>;
  };

  addProvider(AuthProviderWrapper);

  addWrapper(AuthRouteWrapper);
};

export type {
  Auth,
};
export default runtime;