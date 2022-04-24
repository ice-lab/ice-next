function fetch() {
  // @ts-expect-error
  const context = window.__ICE_APP_CONTEXT__;
  const { routesLoader } = context;

  const routes = Object.keys(routesLoader);

  const cache = new Map();

  routes.forEach(id => {
    const loader = routesLoader[id];

    const fetcher = window.fetch(loader.url).then(result => {
      return result.json();
    }).then(data => {
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
      value: fetcher,
      status: 'PENDING',
    });
  });

  // @ts-expect-error
  window.__ICE_DATA_LOADER__ = async function (id) {
    const result = cache.get(id);
    const { value, status } = result;

    if (status === 'RESOLVED' || status === 'REJECTED') {
      return value;
    }

    return await value;
  };
}

fetch();
