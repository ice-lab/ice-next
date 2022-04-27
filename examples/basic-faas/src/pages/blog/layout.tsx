import { Outlet } from 'ice';

export default function BlogLayout() {
  return (
    <>
      <h2>Blog Page</h2>
      <Outlet />
    </>
  );
}
