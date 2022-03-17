import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Router, useRoutes } from 'react-router-dom';
import { useAppContext } from './AppContext.js';
import type { AppRouterProps } from './types.js';

const AppRouter: React.ComponentType<AppRouterProps> = (props) => {
  const { action, location, navigator, static: staticProps } = props;
  return (
    <Router
      navigationType={action}
      location={location}
      navigator={navigator}
      static={staticProps}
    >
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.ComponentType<{}> = () => {
  const appContext = useAppContext();
  const { routes } = appContext;
  return (
    <Routes routes={routes} />
  );
};

interface RoutesProps {
  routes: RouteObject[];
}

function Routes({ routes }: RoutesProps) {
  const element = useRoutes(routes);
  return element;
}

export default AppRouter;