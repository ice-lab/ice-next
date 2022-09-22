import { Link } from 'ice';
import Counter from '@/components/Counter';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Counter />
      <Link to="/about">About</Link>
    </main>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}
