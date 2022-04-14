import * as React from 'react';
import type { PageWrapper } from './types';
import { useAppContext } from './AppContext.js';
import { DataProvider, ConfigProvider } from './PageContext.js';

interface Props {
  PageComponent: React.ComponentType<any>;
  PageWrappers?: PageWrapper<any>[];
  id: string;
}

export default function PageWrapper(props: Props) {
  const { PageComponent, PageWrappers, id } = props;
  const { pagesData, pagesConfig } = useAppContext();

  const Page = (PageWrappers || []).reduce((acc, curr) => curr(acc), PageComponent);

  console.log(111, id);

  return (
    <DataProvider value={pagesData[id]}>
      <ConfigProvider value={pagesConfig[id]}>
        <Page />
      </ConfigProvider>
    </DataProvider>
  );
}