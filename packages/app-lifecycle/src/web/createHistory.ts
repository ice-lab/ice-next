import { createBrowserHistory, createHashHistory, createMemoryHistory } from 'history';
import type { History } from 'history';
import { setHistory } from '../storage';
import type { CreateHistory } from '../types';

const createHistory: CreateHistory = ({ type, location }) => {
  let history: History;
  if (process.env.__IS_SERVER__) {
    history = createMemoryHistory();
    (history as any).location = location;
  } else if (type === 'hash') {
    history = createHashHistory();
  } else if (type === 'browser') {
    history = createBrowserHistory();
  } else {
    history = createMemoryHistory();
  }
  setHistory(history);
  return history;
};

export default createHistory;