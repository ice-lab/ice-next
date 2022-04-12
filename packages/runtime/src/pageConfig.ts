import type { RouteMatch, RoutePageConfig } from './types';

export function getMeta(matches: RouteMatch[], pageConfig: RoutePageConfig) {
  return getAndMerge('meta', matches, pageConfig);
}

export function getLinks(matches: RouteMatch[], pageConfig: RoutePageConfig) {
  return getAndMerge('links', matches, pageConfig);
}

export function getScripts(matches: RouteMatch[], pageConfig: RoutePageConfig) {
  return getAndMerge('scripts', matches, pageConfig);
}

export function getTitle(matches: RouteMatch[], pageConfig: RoutePageConfig) {
  return get('title', matches, pageConfig);
}

/**
 * merge value for each matched route, such as links/scripts.
 */
function getAndMerge(key, matches: RouteMatch[], pageConfig: RoutePageConfig) {
  let result = [];
  for (let match of matches) {
    let routeId = match.route.id;
    let data = pageConfig[routeId];

    if (data && data[key]) {
      result = result.concat(data[key]);
    }
  }

  return result;
}

/**
 * if multi route has same key, return the last value.
 */
function get(key, matches: RouteMatch[], pageConfig: RoutePageConfig) {
  let value = [];
  for (let match of matches) {
    let routeId = match.route.id;
    let data = pageConfig[routeId];

    if (data && data[key]) {
      value = data[key];
    }
  }

  return value;
}