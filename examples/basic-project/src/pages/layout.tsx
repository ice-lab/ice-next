import * as React from 'react';
import { Outlet } from 'ice';

export default () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};

export function getConfig() {
  return {
    title: 'Layout',
    meta: [
      {
        name: 'layout-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        layout: true,
      });
    }, 1 * 100);
  });
}