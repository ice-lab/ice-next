import { Link, useAppData, useData, useConfig } from 'ice';
// not recommended but works
import { useAppContext } from '@ice/runtime';
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

  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
      <div>count: {data.count}</div>
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

export function getData({ pathname, query }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
        count: 100,
        pathname,
        query,
      });
    }, 1 * 100);
  });
}