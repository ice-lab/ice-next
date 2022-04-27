import * as path from 'path';
import fse from 'fs-extra';
import type { RouteItem } from '@ice/runtime';
import { ROUTER_MANIFEST } from '../constant.js';

interface Options {
  entry: string;
  outputDir: string;
  rootDir: string;
  documentOnly: boolean;
}

export default async function generateHTML(options: Options) {
  const {
    entry,
    rootDir,
    outputDir,
    documentOnly,
  } = options;

  const serverEntry = await import(entry);
  // Read the latest routes info.
  const routeManifest = path.join(rootDir, ROUTER_MANIFEST);
  const routes = JSON.parse(fse.readFileSync(routeManifest, 'utf8'));
  const paths = getPaths(routes);

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const requestContext = {
      req: {
        url: routePath,
        path: routePath,
      },
    };
    const { value: html } = await serverEntry.renderToHTML(requestContext, documentOnly);

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    const contentPath = path.join(outputDir, fileName);
    await fse.ensureFile(contentPath);
    await fse.writeFile(contentPath, html);
  }
}

/**
 * get all route path
 * @param routes
 * @returns
 */
function getPaths(routes: RouteItem[], parentPath = ''): string[] {
  let pathList = [];

  routes.forEach(route => {
    if (route.children) {
      pathList = pathList.concat(getPaths(route.children, route.path));
    } else {
      pathList.push(path.join('/', parentPath, route.path || ''));
    }
  });

  return pathList;
}
