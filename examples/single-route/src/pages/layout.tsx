import { Outlet } from 'ice';

console.log('process.env.ICE_CORE_ROUTER', process.env.ICE_CORE_ROUTER);
console.log('Outlet', Outlet);

export default () => {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  );
};