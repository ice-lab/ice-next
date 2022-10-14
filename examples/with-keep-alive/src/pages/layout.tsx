import { unstable_KeepAliveOutlet as KeepAliveOutlet } from 'ice';

export default function Layout() {
  return (
    <>
      <h1>I'm Keep Alive</h1>
      <KeepAliveOutlet />
    </>
  );
}
