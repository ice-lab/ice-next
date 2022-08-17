/**
 * 对 react-router-dom 进行二次封装，保证只有一个路由时能够通过 tree-shaking 将 react-router 相关代码全量移除
 */
 import * as React from 'react';
 import type { History } from 'history';

 export const useRoutes = (routes) => {
   return <>{routes[0].element}</>;
 };

 export const Router = (props) => {
   return <>{props.children}</>;
 };

 export const createHistory = (): History => {
   return {
     // @ts-expect-error
     listen: () => {},
     // @ts-expect-error
     action: 'POP',
     // @ts-expect-error
     location: '',
   };
 };

 export const matchRoutes = (routes: any[]) => {
   return routes.map(item => {
     return {
       params: {},
       pathname: '',
       pathnameBase: '',
       route: item,
     };
   });
 };

 export const Link = () => null;
 export const Outlet = () => {
   return <></>;
 };
 export const useParams = () => {
   return {};
 };
 export const useSearchParams = () => {
   return [{}, () => {}];
 };
 export const useLocation = () => {
   return {};
 };
