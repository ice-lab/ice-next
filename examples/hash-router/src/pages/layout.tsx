import { Outlet, useData, useConfig } from 'ice';

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
    title: 'Hash Router Demo',
  };
}
