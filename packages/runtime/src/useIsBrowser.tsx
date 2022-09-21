import { useContext } from 'react';
import { Context } from './BrowserContext.js';

export default function useIsBrowser() {
  return useContext(Context);
}
