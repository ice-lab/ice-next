import type { GetData, InitialContext } from './types';

interface Loaders {
  [routeId: string]: GetData;
}

interface Result {
  value: any;
  status: string;
}

const cache = new Map<string, Result>();

/**
 * getData and set to cache.
 */
function loadInitialData(loaders: Loaders) {
  // TODO: matches info
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const routes = context.routesConfig || {};
  const matches = Object.keys(routes);

  matches.forEach(id => {
    const getData = loaders[id];
    if (getData) {
      const initialContext = getInitialContext();
      const loader = getData(initialContext).then(data => {
        cache.set(id, {
          value: data,
          status: 'RESOLVED',
        });
        return data;
      }).catch(err => {
        cache.set(id, {
          value: err,
          status: 'REJECTED',
        });
      });

      cache.set(id, {
        value: loader,
        status: 'PENDING',
      });
    }
  });
}

/**
 * getData from cache or run it.
 */
async function run(id: string, loader: GetData) {
  if (!loader) {
    return null;
  }

  const result = cache.get(id);

  if (result) {
    const { value, status } = result;

    if (status === 'RESOLVED' || status === 'REJECTED') {
      return value;
    }

    // PENDING
    return await value;
  } else {
    const initialContext = getInitialContext();
    return await loader(initialContext);
  }
}

/**
 * Load initial data and register global loader.
 */
function init(loaders: Loaders) {
  try {
    loadInitialData(loaders);
  } catch (e) {
    console.error(e);
  }

  (window as any).__ICE_DATA_LOADER__ = (id) => {
    const loader = loaders[id];
    run(id, loader);
  };
}

function getInitialContext() {
  const { href, origin, pathname } = window.location;
  const path = href.replace(origin, '');
  // FIXME
  const query = {};
  const initialContext: InitialContext = {
    pathname,
    path,
    query,
  };

  return initialContext;
}

export default {
  init,
};
