import { getOptions } from 'loader-utils';
import type webpack from 'webpack';

import appLoader from './app.js';
import pageLoader from './page.js';

export default function (this: webpack.LoaderContext<any>, source: string) {
  const options = getOptions(this);
  if (options.type === 'app') {
    appLoader.call(this, source);
  } else {
    pageLoader.call(this, source);
  }
}
