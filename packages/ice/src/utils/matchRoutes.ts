import { matchRoutes as originMatchRoutes } from 'react-router';

const matchRoutes: typeof originMatchRoutes = function (routes, location, basename) {
  let matches = originMatchRoutes(routes, location, basename);
  if (!matches) return [];

  return matches.map(({ params, pathname, pathnameBase, route }) => ({
    params,
    pathname,
    route,
    pathnameBase,
  }));
};

export default matchRoutes;