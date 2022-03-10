import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};