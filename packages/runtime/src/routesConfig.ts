import type { RouteMatch, RoutesConfig } from './types';

export function getMeta(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('meta', matches, routesConfig);
}

export function getLinks(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('links', matches, routesConfig);
}

export function getScripts(matches: RouteMatch[], routesConfig: RoutesConfig) {
  return getMergedValue('scripts', matches, routesConfig);
}

export function getTitle(matches: RouteMatch[], routesConfig: RoutesConfig): string {
  return getValue('title', matches, routesConfig);
}

/**
 * merge value for each matched route, such as links/scripts.
 */
function getMergedValue(key: string, matches: RouteMatch[], routesConfig: RoutesConfig) {
  let result = [];
  for (let match of matches) {
    let routeId = match.route.id;
    let data = routesConfig[routeId];

    if (data && data[key]) {
      result = result.concat(data[key]);
    }
  }

  return result;
}

/**
 * if multi route has same key, return the last value.
 */
function getValue(key: string, matches: RouteMatch[], routesConfig: RoutesConfig) {
  let value;
  for (let match of matches) {
    let routeId = match.route.id;
    let data = routesConfig[routeId];

    if (data && data[key]) {
      value = data[key];
    }
  }

  return value;
}