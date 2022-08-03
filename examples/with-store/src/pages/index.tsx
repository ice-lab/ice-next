import store from '@/store';

function Home() {
  const [userState] = store.useModel('user');

  return (
    <div>
      name: {userState.name}
    </div>
  );
}

export default Home;
