import React from 'react';
import { Current } from '@ice/miniapp-runtime';

interface ILinkProps extends React.ComponentProps<any> {
  to: string;
}

function matchRoute(path: string, routes: Array<string>): string | undefined {
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
  console.log('🚀 ~ file: Link.tsx ~ line 25 ~ matchRoute ~ matchedRoute', matchedRoute);
  return matchedRoute;
}

export default function Link(props: ILinkProps) {
  const { routes } = Current.app.config;
  const url = matchRoute(props.to, routes);
  // TODO: navigator 其他值
  // @ts-ignore
  return <navigator url={url}>{props.children}</navigator>;
}
