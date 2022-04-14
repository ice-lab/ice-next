import type { RouteMatch, PagesConfig } from './types';

export function getMeta(matches: RouteMatch[], pagesConfig: PagesConfig) {
  return getMergedValue('meta', matches, pagesConfig);
}

export function getLinks(matches: RouteMatch[], pagesConfig: PagesConfig) {
  return getMergedValue('links', matches, pagesConfig);
}

export function getScripts(matches: RouteMatch[], pagesConfig: PagesConfig) {
  return getMergedValue('scripts', matches, pagesConfig);
}

export function getTitle(matches: RouteMatch[], pagesConfig: PagesConfig): string {
  return getValue('title', matches, pagesConfig);
}

/**
 * merge value for each matched route, such as links/scripts.
 */
function getMergedValue(key: string, matches: RouteMatch[], pagesConfig: PagesConfig) {
  let result = [];
  for (let match of matches) {
    let routeId = match.route.id;
    let data = pagesConfig[routeId];

    if (data && data[key]) {
      result = result.concat(data[key]);
    }
  }

  return result;
}

/**
 * if multi route has same key, return the last value.
 */
function getValue(key: string, matches: RouteMatch[], pagesConfig: PagesConfig) {
  let value;
  for (let match of matches) {
    let routeId = match.route.id;
    let data = pagesConfig[routeId];

    if (data && data[key]) {
      value = data[key];
    }
  }

  return value;
}