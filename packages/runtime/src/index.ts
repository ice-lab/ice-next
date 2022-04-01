import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import runClientApp from './runClientApp.js';
import runServerApp from './runServerApp.js';
import { useAppContext } from './AppContext.js';
import {
  Meta,
  Title,
  Links,
  Scripts,
  Main,
} from './Document.js';
import type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  PageWrapper,
  RouteItem,
} from './types.js';
import defineAppConfig from './defineAppConfig.js';
import { matchRoutes } from './routes.js';

export {
  matchRoutes,
  Runtime,
  App,
  runClientApp,
  runServerApp,
  useAppContext,
  Meta,
  Title,
  Links,
  Scripts,
  Main,
  defineAppConfig,
  // react-router-dom API
  Link,
  Outlet,
  useParams,
  useSearchParams,
};

export type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  PageWrapper,
  RouteItem,
};