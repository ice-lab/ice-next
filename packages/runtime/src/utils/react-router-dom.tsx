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

// @ts-expect-error
if (process.env.ICE_RUNTIME_ROUTER === true) {
  Link = OriginLink;
  Outlet = OriginOutlet;
  matchRoutes = originMatchRoutes;
  createSearchParams = originCreateSearchParams;
  Router = OriginRouter;
  useRoutes = originUseRoutes;
  createHashHistory = originCreateHashHistory;
  createBrowserHistory = originCreateBrowserHistory;
} else {
  console.debug('History disabled, process.env.ICE_RUNTIME_ROUTER', process.env.ICE_RUNTIME_ROUTER);
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
        // TODO: 这几个的值是什么
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
  createHashHistory = () => null;
  createBrowserHistory = () => null;
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
};