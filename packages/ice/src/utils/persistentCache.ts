import * as path from 'path';
import { put, get } from '@ice/bundles/compiled/cacache/index.js';

const CACHE_PATH = 'node_module/.cache/route';

export function getRouteCache(rootDir: string, routeId: string) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return get(cachePath, routeId).then((cache) => JSON.parse(cache.data.toString('utf-8')));
}

export function setRouteCache(rootDir: string, routeId: string, data: any) {
  const cachePath = path.join(rootDir, CACHE_PATH);
  return put(cachePath, routeId, JSON.stringify(data));
}