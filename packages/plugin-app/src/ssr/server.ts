interface Options {
  routeManifest: Record<string, unknown>;
  entry: string;
  cache: Map<string, unknown>;
}

export function setupRenderServer(options: Options) {
  const {
    routeManifest,
    entry,
    cache,
  } = options;

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }
    const serverEntry = await import(`${entry}?version=${cache.get('version') || 0}`);
    const html = await serverEntry.render({
      req,
      res,
    });

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}