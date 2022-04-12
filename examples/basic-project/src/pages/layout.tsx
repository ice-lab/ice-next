import * as React from 'react';
import { Outlet } from 'ice';
import type { PageConfig } from '@ice/runtime/esm/types';

export default () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};

export function getPageConfig(): PageConfig {
  return {
    title: 'Repo',
    meta: [
      {
        name: 'layout-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export function getInitialData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Repo',
      });
    }, 1 * 100);
  });
}