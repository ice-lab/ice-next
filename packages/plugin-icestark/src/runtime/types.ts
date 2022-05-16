import type * as React from 'react';
import type { RouteConfig } from '@ice/types';
export interface AuthConfig {
  initialAuth: {
    [auth: string]: boolean;
  };
  NoAuthFallback?: React.ComponentType<{routeConfig: RouteConfig}>;
}

export type AuthType = Record<string, boolean>;
export type ContextType = [AuthType, React.Dispatch<React.SetStateAction<AuthType>>];