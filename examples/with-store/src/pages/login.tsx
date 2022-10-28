import { history } from 'ice';
import store from '@/store';

export default function Login() {
  const [, userDispatcher] = store.useModel('user');

  function login() {
    userDispatcher.setState({ name: 'Hello' });
    history?.push('/');
  }

  return (
    <div onClick={() => login()}>Click Me to Login</div>
  );
}
