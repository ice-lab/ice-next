import * as React from 'react';
import type { PageWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { PageContextProvider } from './PageContext.js';

interface Props {
  PageComponent: React.ComponentType<any>;
  PageWrappers?: PageWrapper<any>[];
}

export default function PageWrapper(props: Props) {
  const { PageComponent, PageWrappers } = props;
  const { pagesData } = useAppContext();

  const Page = (PageWrappers || []).reduce((acc, curr) => curr(acc), PageComponent);

  return (
    // TODO: getPageData By RouteID
    <PageContextProvider value={{ ...pagesData }}>
      <Page />
    </PageContextProvider>
  );
}