import * as path from 'path';

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
    const serverRender = await import(path.resolve(rootDir, 'build/server.mjs'));

    const html = await serverRender.default({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}