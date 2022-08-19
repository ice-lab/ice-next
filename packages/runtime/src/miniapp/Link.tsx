import React from 'react';
import { Current } from '@ice/miniapp-runtime';

interface ILinkProps extends React.ComponentProps<any> {
  to: string;
}

function matchRoute(url: string, routes: Array<string>): string | undefined {
  const [url_, hash] = url.split('#');
  const [path, query] = url_.split('?');
  /*
  * path => route
  * 1.  /about => about or about/index
  * 2.  /about/profile => about/profile or about/profile/index
  * 3. / => index
  */
  const matchedRoute = routes.find(route => {
    if (path !== '/') {
      return `/${route}` === path || `/${route}` === `${path}/index`;
    } else {
      // Index is special
      return route === 'index';
    }
  });
  return query ? `${matchedRoute}?${query}` : matchedRoute;
}

export default function Link(props: ILinkProps) {
  const { routes } = Current.app.config;
  const url = matchRoute(props.to, routes);
  // @ts-ignore
  return <navigator url={url}>{props.children}</navigator>;
}
