import { useEffect } from 'react';
import { useRequest } from 'ice';
import styles from './index.module.css';
import service from '../service';

export default function home() {
  const { data, error, loading, request } = useRequest(service.getUser);

  useEffect(() => {
    request();
  }, []);

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data || loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h2 className={styles.title}>Name: {data.name} Age: {data.age}</h2>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}