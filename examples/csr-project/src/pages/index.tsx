import count from '../components/count';
import styles from './index.module.css';

export default function Home(props) {
  return (
    <>
      <h2 className={styles.title}>Home Page</h2>
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
        count: count(),
      });
    }, 1 * 100);
  });
}