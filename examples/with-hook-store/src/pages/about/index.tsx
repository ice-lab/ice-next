import store from './store';

function About() {
  const { name, age } = store.useHooks('useUser');
  return (
    <>
      <div>name: {name}</div>
      <div>age: {age}</div>
    </>
  );
}

export default About;
