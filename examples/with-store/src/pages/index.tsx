import { Link } from 'ice';
import pageStore from './store';
import appStore from '@/store';

function Home() {
  const [userState] = appStore.useModel('user');
  const [countState, countDispatcher] = pageStore.useModel('counter');
  return (
    <>
      <div>
        name: {userState.name}
      </div>
      <div>
        <button onClick={() => countDispatcher.inc()}>+</button>
        {countState.count}
        <button onClick={() => countDispatcher.dec()}>-</button>
      </div>
      <Link to="/blog">Blog</Link>
    </>
  );
}


export default Home;
