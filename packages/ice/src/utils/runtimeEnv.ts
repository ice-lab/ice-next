import type { RouteManifest } from '@ice/route-manifest';
import type { CommandArgs, CommandName } from 'build-scripts';

export type AppConfig = Record<string, any>;
export interface Envs {
  [key: string]: string;
}

export async function initProcessEnv(command: CommandName, commandArgs: CommandArgs): Promise<void> {
  process.env.ICE_MODE = commandArgs.mode;
  process.env.ICE_DEV_PORT = commandArgs.port;

  // DG TODO: load .env file

  if (command === 'start') {
    process.env.NODE_ENV = 'development';
  } else if (command === 'test') {
    process.env.NODE_ENV = 'test';
  } else {
    // build
    process.env.NODE_ENV = 'production';
  }

  // set runtime initial env
  process.env.ICE_ROUTER = 'true';
  process.env.ICE_ERROR_BOUNDARY = 'true';
  process.env.ICE_INITIAL_DATA = 'true';
}

export const updateRuntimeEnv = (routeManifest?: RouteManifest, appConfig?: AppConfig) => {
  if (!appConfig?.app?.getInitialData) {
    process.env['ICE_INITIAL_DATA'] = 'false';
  }
  if (!appConfig?.app?.errorBoundary) {
    process.env['ICE_ERROR_BOUNDARY'] = 'false';
  }
  if (routeManifest && Object.keys(routeManifest).length <= 1) {
    process.env['ICE_ROUTER'] = 'false';
  }
};