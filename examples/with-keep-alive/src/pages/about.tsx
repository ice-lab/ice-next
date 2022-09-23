import { Link } from 'ice';
import Counter from '@/components/Counter';

export default function About() {
  return (
    <>
      <h1>About</h1>
      <Counter />
      <Link to="/">Home</Link>
    </>
  );
}

export function getConfig() {
  return {
    title: 'About',
    // keepAlive: false,
  };
}
