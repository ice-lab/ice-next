import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import type { RuntimePlugin } from '@ice/types';
import { getMountNode } from '@ice/stark-app';
import { AppRouter, AppRoute } from '@ice/stark';
import { useState, useEffect } from 'react';

const runtime: RuntimePlugin = ({ appContext, useConfig, setRender, setAppRouter }) => {
  const { appConfig } = appContext;

  // FIXME: how to determine app type
  const type: 'child' | 'framework' = 'framework';

  // @ts-ignore
  if (type === 'child') {
    setRender((_, element) => {
      const mountNode = getMountNode();
      const root = ReactDOM.createRoot(mountNode);
      root.render(element);
    });
  }

  // @ts-ignore
  if (type === 'framework') {
    const { getApps, Layout } = appConfig?.icestark;

    const FrameworkApp = ({ App }) => {
      console.log('fsfdsfs', App);
      const [apps, setApps] = useState(null);

      useEffect(() => {
        (async () => {
          // 异步 apps 获取
          const appList = await getApps();
          setApps(appList);
        })();
      }, []);

      return (<Layout>
        { apps && (
          <AppRouter>
            {apps.map((item, idx: number) => {
                return (
                  <AppRoute
                    key={idx}
                    {...item}
                  />
                );
              })}
            <AppRoute
              path="/"
              name="frameworkapp"
              // @ts-ignore
              component={App}
            />
          </AppRouter>
        )}
      </Layout>);
    };

    setRender((_, Element) => {
      const root = ReactDOM.createRoot(_);
      // @ts-ignore
      root.render(<FrameworkApp App={Element} />);
    });
  }
};

export default runtime;
