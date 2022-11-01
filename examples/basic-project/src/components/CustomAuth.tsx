import { useAuth } from 'ice';

function Auth({ children, authKey, fallback }) {
  const [auth, setAuth] = useAuth();
  // 判断是否有权限
  const hasAuth = auth[authKey];
  console.log('my custom auth');
  // 有权限时直接渲染内容
  if (hasAuth) {
    return children;
  } else {
    // 无权限时显示指定 UI
    return fallback || <><div onClick={() => setAuth({ guest: true })}>SetAuth</div>No Auth</>;
  }
}

export default Auth;