import { useState } from 'react';

function useUser() {
  const [age, setAge] = useState(0);
  const updateAge = (age: number) => setAge(age);

  const name = 'ICE 3';

  return {
    name,
    age,
    updateAge,
  };
}

export default useUser;
