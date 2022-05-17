import { AppLink } from '@ice/stark-app';

const Layout = ({ children }) => {
  return (
    <>
      <ul>
        <li>
          <AppLink to="/blog"> blog </AppLink>
        </li>
        <li>
          <AppLink to="/seller/list" > react </AppLink>
        </li>
      </ul>
      {children}
    </>

  );
};

export default Layout;
