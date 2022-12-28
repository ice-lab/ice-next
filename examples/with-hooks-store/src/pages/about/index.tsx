import { Link } from 'ice';
import store from './store';

function About() {
  const { name, age } = store.useHook('useUser');
  return (
    <>
      <div>name: {name}</div>
      <div>age: {age}</div>

      <Link to="/">Home</Link>
    </>
  );
}

export default About;
