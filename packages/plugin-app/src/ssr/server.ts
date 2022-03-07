import * as path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export function setupServerRender(options: any) {
  const {
    rootDir,
    routeManifest,
  } = options;

  process.env.__IS_SERVER__ = 'true';

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    // TODO: disable cache
    const serverRender = require(path.resolve(rootDir, 'build/server.js'));

    const html = await serverRender.default({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}