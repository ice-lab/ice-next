import * as React from 'react';
import { Link } from 'ice';
import styles from './index.module.css';

export default function Home(props) {
  console.log('render Home', props);

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