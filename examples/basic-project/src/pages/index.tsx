import * as React from 'react';
import { useAppContext } from 'ice';
import './index.css';

export default function Home() {
  const appContext = useAppContext();

  console.log('Home Page: appContext', appContext);

  return <><h3>Home Page</h3></>;
}

Home.pageConfig = {
  auth: ['admin'],
};