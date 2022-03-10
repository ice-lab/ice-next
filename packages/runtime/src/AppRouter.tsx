import * as React from 'react';
import {
  HashRouter,
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useAppContext } from './AppContext.js';
import RouteWrapper from './RouteWrapper.js';
import type { PageWrapper } from './types';

interface Props {
  PageWrappers?: PageWrapper<any>[];
}

const AppRouter: React.ComponentType<Props> = (props) => {
  const { PageWrappers } = props;
  const appContext = useAppContext();
  const { routes, appConfig } = appContext;

  if (!routes || routes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  } else if (routes.length > 1) {
    // TODO: routes.length > 1 -> process.env.ICE_ROUTER === 'disabled'
    const Router = appConfig.router.type === 'hash' ? HashRouter : BrowserRouter;
    return (
      <Router>
        <Routes>
          {
            routes.map((route, index) => {
              const PageComponent = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <React.Suspense fallback={<>loading chunk....</>}>
                      <RouteWrapper PageComponent={PageComponent} PageWrappers={PageWrappers} />
                    </React.Suspense>
                  }
                />
              );
            })
          }
        </Routes>
      </Router>
    );
  } else {
    // routes.length === 1
    const PageComponent = routes[0].component;
    return (
      <React.Suspense fallback={<>loading chunk....</>}>
        <RouteWrapper PageComponent={PageComponent} PageWrappers={PageWrappers} />
      </React.Suspense>
    );
  }
};

export default AppRouter;