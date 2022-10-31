import React, { Suspense, lazy } from 'react';

const Comments = lazy(() => import('../components/Comments' /* webpackPrefetch: true */));

export default function Home() {
  return (
    <>
      <h2>Home Page</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Comments />
      </Suspense>
    </>
  );
}