import * as React from 'react';
import type { RouteWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { DataProvider, ConfigProvider } from './RouteContext.js';

interface Props {
  id: string;
  wrappers?: RouteWrapper[];
  children?: React.ReactNode;
}

export default function RouteWrapper(props: Props) {
  const { wrappers = [], id } = props;
  const { routesData, routesConfig } = useAppContext();

  const idParts = id.split('/');
  const isLayout = idParts[idParts.length - 1] === 'layout';

  // layout should only be wrapped by Wrapper with `layout: true`
  const filtered = isLayout ? wrappers.filter(wrapper => wrapper.layout === true) : wrappers;
  const RouteWrappers = filtered.map(item => item.Wrapper);

  let element;

  if (RouteWrappers.length) {
    element = RouteWrappers.reduce((preElement, CurrentWrapper) => (
      <CurrentWrapper>
        {preElement}
      </CurrentWrapper>
    ), props.children);
  } else {
    element = props.children;
  }

  return (
    <DataProvider value={routesData[id]}>
      <ConfigProvider value={routesConfig[id]}>
        {element}
      </ConfigProvider>
    </DataProvider>
  );
}