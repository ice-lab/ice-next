import type { RouteMatch, PageConfig } from './types';

export function getMeta(matches: RouteMatch[], pageConfig: PageConfig) {
  return getMergedValue('meta', matches, pageConfig);
}

export function getLinks(matches: RouteMatch[], pageConfig: PageConfig) {
  return getMergedValue('links', matches, pageConfig);
}

export function getScripts(matches: RouteMatch[], pageConfig: PageConfig) {
  return getMergedValue('scripts', matches, pageConfig);
}

export function getTitle(matches: RouteMatch[], pageConfig: PageConfig) {
  return getValue('title', matches, pageConfig);
}

/**
 * merge value for each matched route, such as links/scripts.
 */
function getMergedValue(key, matches: RouteMatch[], pageConfig: PageConfig) {
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
function getValue(key, matches: RouteMatch[], pageConfig: PageConfig) {
  let value;
  for (let match of matches) {
    let routeId = match.route.id;
    let data = pageConfig[routeId];

    if (data && data[key]) {
      value = data[key];
    }
  }

  return value;
}