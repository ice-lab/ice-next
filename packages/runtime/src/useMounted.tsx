import { useContext } from 'react';
import { Context } from './ClientContext.js';

export default function useMounted() {
  return useContext(Context);
}
