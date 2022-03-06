import path from 'path';
import renderDocument from './renderDocument.js';

interface Options {
  outputDir: string;
  // TODO: type
  routeManifest: any;
}

export function setupRenderServer(options: Options) {
  const {
    outputDir,
    routeManifest,
  } = options;

  return (req, res) => {
    if (!routeManifest[req.path]) {
      return;
    }

    // TODO: disable cache
    const html = renderDocument(path.join(outputDir, 'document.js'));

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}