import { useState } from 'react';

function useTodo() {
  const [todos, setTodos] = useState([{ name: 'ICE', id: 'ICE' }]);

  return {
    todos,
    setTodos,
  };
}

export default useTodo;
