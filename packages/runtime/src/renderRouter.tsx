import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import type { RenderApp } from '@ice/types/esm/runtime.js';
import AppErrorBoundary from './AppErrorBoundary.js';

const renderRouter: RenderApp = ({ renderComponent, routes }) => {
  if (routes) {
    return function AppRouter() {
      return (
        <AppErrorBoundary>
          <BrowserRouter>
            <Routes>
              {
                routes.map((route, index) => {
                  const RouteComponent = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <React.Suspense  fallback={<>loading chunk....</>}>
                          <RouteComponent />
                        </React.Suspense>
                      }
                    />
                  );
                })
              }
            </Routes>
          </BrowserRouter>
        </AppErrorBoundary>
      );
    };
  }

  if (renderComponent) {
    return renderComponent;
  }

  return () => <>Error: No routes and no app.renderComponent</>;
};

export default renderRouter;