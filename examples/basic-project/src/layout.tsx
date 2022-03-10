import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
};