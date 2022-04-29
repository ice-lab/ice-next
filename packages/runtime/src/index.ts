import {
  Link,
  Outlet,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import runClientApp from './runClientApp.js';
import { renderToHTML, renderToResponse } from './runServerApp.js';
import { useAppContext } from './AppContext.js';
import { useAppData } from './AppData.js';
import { useData, useConfig } from './RouteContext.js';
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
  RouteConfig,
  RouteItem,
  ServerContext,
} from './types.js';
import { matchRoutes } from './routes.js';
import dataLoader from './dataLoader.js';

export {
  matchRoutes,
  Runtime,
  App,
  runClientApp,
  renderToHTML,
  renderToResponse,
  useAppContext,
  useAppData,
  useData,
  useConfig,
  Meta,
  Title,
  Links,
  Scripts,
  Main,
  // react-router-dom API
  Link,
  Outlet,
  useParams,
  useSearchParams,
  dataLoader,
};

export type {
  RuntimePlugin,
  AppContext,
  AppConfig,
  RouteConfig,
  RouteItem,
  ServerContext,
};