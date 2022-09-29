import { Outlet } from 'ice';

export default function layout() {
  return (
    <>
      <h1>About</h1>
      <Outlet />
    </>
  );
}