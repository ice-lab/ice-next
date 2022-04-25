import { Link, useAppData, useData, useConfig } from 'ice';
// not recommended but works
import { useAppContext } from '@ice/runtime';
import { useRequest } from 'ahooks';
import styles from './index.module.css';
import type { AppData } from '@/types';

export default function Home(props) {
  console.log('render Home', props);

  const appData = useAppData<AppData>();
  console.log('get AppData', appData);

  const appContext = useAppContext();
  console.log('get AppContext', appContext);

  const data = useData();
  const config = useConfig();

  console.log('render Home', 'data', data, 'config', config);

  const { data: foo } = useRequest(() => fetch('/api/foo').then(res => res.json()));
  const { data: users } = useRequest(() => fetch('/api/users').then(res => res.json()));
  const { data: userInfo } = useRequest(() => fetch('/api/users/a', { method: 'POST' }).then(res => res.json()));

  console.log('foo: ', foo);
  console.log('users: ', users);
  console.log('userInfo: ', userInfo);
  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
    meta: [
      {
        name: 'theme-color',
        content: '#000',
      },
      {
        name: 'title-color',
        content: '#f00',
      },
    ],
    auth: ['admin'],
  };
}

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
      });
    }, 1 * 100);
  });
}