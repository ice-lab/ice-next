import pageStore from './store';
import appStore from '@/store';

function Home() {
  const [userState] = appStore.useModel('user');
  const [titleState] = pageStore.useModel('title');

  return (
    <div>
      name: {userState.name}
      title: {titleState.name}
    </div>
  );
}

const { Provider } = pageStore;
export { Provider };

export default Home;
