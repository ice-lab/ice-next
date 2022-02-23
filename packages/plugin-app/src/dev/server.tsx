import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ssrLoadModule } from './ssr/moduleLoader';

export async function handleRequest(req, res, context) {
  const html = await renderDocument(context);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}

async function renderDocument(context) {
  const { rootDir } = context;

  const sourcePath = path.join(rootDir, '/src/document/index.jsx');
  const { mod } = await ssrLoadModule(sourcePath);

  const Document = mod;

  const html = ReactDOMServer.renderToString(<Document />);
  return html;
}