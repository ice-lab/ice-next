import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type { RuntimePlugin } from '@ice/types';
import { getMountNode } from '@ice/stark-app';

const runtime: RuntimePlugin = ({ appContext, useConfig, setRender }) => {
  const { appConfig } = appContext;

  setRender((_, element) => {
    const mountNode = getMountNode();
    const root = ReactDOM.createRoot(mountNode);
    root.render(element);
  });
};

export default runtime;
