import { Link } from 'ice';
import appStore from '@/store';

function Home() {
  const { name } = appStore.useHooks('useUser');
  return (
    <>
      <div id="username">
        name: {name}
      </div>
      <Link to="/counter">Counter</Link>
    </>
  );
}


export default Home;
