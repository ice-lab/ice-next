import * as React from 'react';
import { useAppContext, Link } from 'ice';
import type { PageConfig } from '@ice/runtime/esm/types';
import styles from './index.module.css';

export default function Home(props) {
  // const appContext = useAppContext();

  console.log('render Home', props);

  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
      <Link to="/about">about</Link>
    </>
  );
}

export function getPageConfig(): PageConfig {
  return {
    // scripts: [
    //   { src: 'https://g.alicdn.com/alilog/mlog/aplus_v2.js', block: true },
    // ],
    auth: ['admin'],
  };
}

export function getInitialData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Home',
      });
    }, 1 * 1000);
  });
}