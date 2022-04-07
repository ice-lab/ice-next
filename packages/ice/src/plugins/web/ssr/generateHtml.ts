import * as fs from 'fs';
import * as path from 'path';
import type { RouteItem } from '@ice/runtime';

interface Options {
  entry: string;
  routeManifest: string;
  outDir: string;
  ssg: boolean;
}

export default async function generateHTML(options: Options) {
  const {
    entry,
    routeManifest,
    outDir,
    ssg,
  } = options;

  const serverEntry = await import(entry);
  const routes = JSON.parse(fs.readFileSync(routeManifest, 'utf8'));
  const paths = getPaths(routes);

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const requestContext = {
      req: {
        url: routePath,
        path: routePath,
      },
    };

    const html = await serverEntry[ssg ? 'render' : 'renderDocument'](requestContext);

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    fs.writeFileSync(path.join(outDir, fileName), html);
  }
}

/**
 * get all route path
 * @param routes
 * @returns
 */
function getPaths(routes: RouteItem[]): string[] {
  let pathList = [];

  routes.forEach(route => {
    if (route.children) {
      pathList = pathList.concat(getPaths(route.children));
    } else {
      pathList.push(route.path || '/');
    }
  });

  return pathList;
}