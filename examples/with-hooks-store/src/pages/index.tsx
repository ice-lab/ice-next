import { Link } from 'ice';
import pageStore from './store';
import appStore from '@/store';

function Home() {
  const { todos } = appStore.useHook('useTodo');
  const { count, increment, decrement } = pageStore.useHook('useCounter');

  return (
    <>
      <div>
        ToDo List
        <ul id="todos">
          {todos.map(todo => (<li key={todo.id}>{todo.name}</li>))}
        </ul>
      </div>
      <div>
        <button type="button" onClick={() => increment()}>+</button>
        <span>{count}</span>
        <button type="button" onClick={() => decrement()}>-</button>
      </div>
      <Link to="/about">About</Link>
    </>
  );
}


export default Home;
