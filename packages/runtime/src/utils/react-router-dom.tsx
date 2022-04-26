/**
 * 对 react-router-dom 进行二次封装，保证只有一个路由时能够通过 tree-shaking 将 react-router 相关代码全量移除
 */
import * as React from 'react';
import {
  matchRoutes as originMatchRoutes,
  Link as OriginLink,
  Outlet as OriginOutlet,
  createSearchParams as originCreateSearchParams,
  Router as OriginRouter,
  useRoutes as originUseRoutes,
  useParams as originUseParams,
  useSearchParams as originUseSearchParams,
} from 'react-router-dom';
import {
  createHashHistory as originCreateHashHistory,
  createBrowserHistory as originCreateBrowserHistory,
} from 'history';

let Link: typeof OriginLink;
let Outlet: typeof OriginOutlet;
let createSearchParams: typeof originCreateSearchParams;
let matchRoutes: typeof originMatchRoutes;
let Router: typeof OriginRouter;
let useRoutes: typeof originUseRoutes;
let createHashHistory: typeof originCreateHashHistory;
let createBrowserHistory: typeof originCreateBrowserHistory;
let useParams: typeof originUseParams;
let useSearchParams: typeof originUseSearchParams;

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.ICE_CORE_ROUTER', process.env.ICE_CORE_ROUTER);

if (process.env.ICE_CORE_ROUTER === 'true') {
  Link = OriginLink;
  Outlet = OriginOutlet;
  matchRoutes = originMatchRoutes;
  createSearchParams = originCreateSearchParams;
  Router = OriginRouter;
  useRoutes = originUseRoutes;
  createHashHistory = originCreateHashHistory;
  createBrowserHistory = originCreateBrowserHistory;
  useParams = originUseParams;
  useSearchParams = originUseSearchParams;
} else {
  // Mock react-router-dom apis
  // TODO: mock it right

  Link = React.forwardRef(() => null);
  Outlet = () => null;

  // copy from react-router-dom, very simple
  createSearchParams = (init) => {
    if (init === void 0) {
      init = '';
    }

    return new URLSearchParams(typeof init === 'string' || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
      let value = init[key];
      return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
    }, []));
  };

  matchRoutes = (routes) => {
    return routes.map(item => {
      return {
        params: {},
        pathname: '',
        pathnameBase: '',
        route: item,
      };
    });
  };

  useRoutes = (routes) => {
    return <>{routes[0].element}</>;
  };

  Router = (props) => {
    return <>{props.children}</>;
  };

  // @ts-expect-error
  createHashHistory = () => {
    return {
      listen: () => {},
      action: 'POP',
      location: '',
    };
  };
  // @ts-expect-error
  createBrowserHistory = () => {
    return {
      listen: () => {},
      action: 'POP',
      location: '',
    };
  };

  // @ts-expect-error
  useParams = () => {
    return {};
  };
  // @ts-expect-error
  useSearchParams = () => {
    return [{}, () => {}];
  };
}

export {
  Link,
  Outlet,
  matchRoutes,
  createSearchParams,
  Router,
  useRoutes,
  createHashHistory,
  createBrowserHistory,
  useParams,
  useSearchParams,
};