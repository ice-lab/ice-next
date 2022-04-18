import type { RouteConfig } from '@ice/types';
export interface AuthConfig {
  NoAuthFallback?: React.ComponentType<{routeConfig: RouteConfig}>;
}

export type AuthType = Record<string, boolean>;
export type ContextType = [AuthType, React.Dispatch<React.SetStateAction<AuthType>>];