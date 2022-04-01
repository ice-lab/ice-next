import * as React from 'react';
import { Outlet, Link } from 'ice';

export default () => {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      <Link to="/dashboard/data">data</Link>
      <Outlet />
    </div>
  );
};