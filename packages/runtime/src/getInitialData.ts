import type { AppContext, InitialContext, AppConfig } from './types';

const getInitialData = async (appConfig: AppConfig): Promise<AppContext['initialData']> => {
  // ssr enabled and the server has returned data
  if ((window as any).__ICE_APP_DATA__) {
    return (window as any).__ICE_APP_DATA__;
    // context.pageInitialProps = (window as any).__ICE_PAGE_PROPS__;
  } else if (appConfig?.app?.getInitialData) {
    const { href, origin, pathname, search } = window.location;
    const path = href.replace(origin, '');
    // const query = queryString.parse(search);
    const query = {};
    const ssrError = (window as any).__ICE_SSR_ERROR__;
    const initialContext: InitialContext = {
      pathname,
      path,
      query,
      ssrError,
    };
    return await appConfig.app.getInitialData(initialContext);
  }
};

export default getInitialData;