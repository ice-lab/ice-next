import store from './store';

function Counter() {
  const { count, increment, decrement } = store.useHooks('useCounter');
  return (
    <div>
      <button type="button" onClick={() => increment()}>+</button>
      <span>{count}</span>
      <button type="button" onClick={() => decrement()}>-</button>
    </div>
  );
}

export default Counter;
