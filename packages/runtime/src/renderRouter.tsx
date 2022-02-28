import * as React from 'react';
import { RenderApp } from '@ice/types/lib/runtime';

const renderRouter: RenderApp = ({ renderComponent, routeManifest }) => {
  if (routeManifest) {
    return function AppRouter() {
      return <div>Router</div>
    };
  }

  if (renderComponent) {
    return renderComponent;
  }

  return () => <>Error: No routes and no app.renderComponent</>;
};

export default renderRouter;