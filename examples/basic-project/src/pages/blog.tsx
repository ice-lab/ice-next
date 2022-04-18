import { Link, useData, useConfig } from 'ice';
// @ts-expect-error
import url from './ice.png';

interface Data {
  name: string;
}

export default function Blog() {
  const data = useData<Data>();
  const config = useConfig();

  console.log('render Blog', 'data', data, 'config', config);

  return (
    <>
      <h2>Blog Page</h2>
      <Link to="/">home</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Blog',
    auth: ['guest'],
  };
}