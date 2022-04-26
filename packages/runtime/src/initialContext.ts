import type { ServerContext, InitialContext } from './types';

interface Location {
  pathname: string;
  search: string;
}

export default function getInitialContext(location: Location, serverContext: ServerContext = {}): InitialContext {
  const { pathname, search } = location;
  const query = parseSearch(search);

  const initialContext: InitialContext = {
    ...serverContext,
    pathname,
    query,
  };

  return initialContext;
}

/**
 * Search string to object
 * URLSearchParams is not compatible with iOS9 and IE.
 */
function parseSearch(search: string) {
  // remove first '?'
  if (search.indexOf('?') === 0) {
    search = search.slice(1);
  }

  const result = {};

  let pairs = search.split('&');

  for (let j = 0; j < pairs.length; j++) {
    const value = pairs[j];
    const index = value.indexOf('=');

    if (index > -1) {
      const k = value.slice(0, index);
      const v = value.slice(index + 1);
      result[k] = v;
    } else if (value) {
      result[value] = '';
    }
  }

  return result;
}