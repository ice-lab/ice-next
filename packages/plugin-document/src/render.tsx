import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export default function render(Component) {
  const html = ReactDOMServer.renderToString(<Component />);

  return html;
}