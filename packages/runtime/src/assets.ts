import type { AssetsManifest, RouteMatch } from './types';
/**
 * merge assets info for matched page
 * @param matches
 * @param assetsManifest
 * @returns
 */
 export function getPageAssets(matches: RouteMatch[], assetsManifest: AssetsManifest): string[] {
  const { pages, publicPath } = assetsManifest;

  let result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const assets = pages[componentName];
    assets && assets.forEach(filePath => {
      result.push(`${publicPath}${filePath}`);
    });
  });

  return result;
}

export function getEntryAssets(assetsManifest: AssetsManifest): string[] {
  const { entries, publicPath } = assetsManifest;
  let result = [];

  Object.values(entries).forEach(assets => {
    result = result.concat(assets);
  });

  return result.map(filePath => `${publicPath}${filePath}`);
}