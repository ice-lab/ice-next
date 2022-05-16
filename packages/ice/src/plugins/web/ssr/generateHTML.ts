import * as path from 'path';
import type { Request } from 'webpack-dev-server';
import fse from 'fs-extra';
import consola from 'consola';
import type { ServerContext } from '@ice/runtime';

interface Options {
  rootDir: string;
  entry: string;
  routeManifest: string;
  outDir: string;
  ssg: boolean;
  ssr: boolean;
}

export default async function generateHTML(options: Options) {
  const {
    rootDir,
    entry,
    routeManifest,
    outDir,
    ssg,
    ssr,
  } = options;

  let serverEntry;

  try {
    serverEntry = await import(entry);
  } catch (err) {
    // make error clearly, notice typeof err === 'string'
    throw new Error(`import ${entry} error: ${err}`);
  }

  const routes = fse.readJSONSync(routeManifest);
  const paths = [];

  routes.values().forEach(route => {
    if (route.path) {
      paths.push(route.path);
    } else if (route.index) {
      paths.push('/');
    }
  });

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];

    const req = {
      url: routePath,
    };

    const serverContext: ServerContext = {
      req: req as Request,
    };

    const documentOnly = !(ssg || ssr);
    const { value: html } = await serverEntry.renderToHTML(serverContext, documentOnly);

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    if (fse.existsSync(path.join(rootDir, 'public', fileName))) {
      consola.warn(`${fileName} is overwrite by framework, rename file name if it is necessary`);
    }
    const contentPath = path.join(outDir, fileName);
    await fse.ensureFile(contentPath);
    await fse.writeFile(contentPath, html);
  }
}
