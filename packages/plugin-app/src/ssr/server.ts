interface Options {
  routeManifest: Record<string, unknown>;
  serverCompiler: () => Promise<string> | void;
}

export function setupRenderServer(options: Options) {
  const {
    routeManifest,
    serverCompiler,
  } = options;

  return async (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }
    const entry = await serverCompiler();
    let html = '';
    if (entry) {
      const serverEntry = await import(entry);
      html = await serverEntry.render({
        req,
        res,
      });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}