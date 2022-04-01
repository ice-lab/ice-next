import * as React from 'react';
import type { PageData, AppData } from './types';

interface DocumentContext {
  html?: string;
  entryAssets?: string[];
  pageAssets?: string[];
  pageData?: PageData;
  appData?: AppData;
  appElement?: any;
  assetsManifest?: any;
}

const Context = React.createContext<DocumentContext>(null);

Context.displayName = 'DocumentContext';

export const useDocumentContext = () => {
  const value = React.useContext(Context);
  return value;
};

export const DocumentContextProvider = Context.Provider;

export function Meta() {
  const { pageData } = useDocumentContext();
  const meta = pageData.pageConfig.meta || [];

  return (
    <>
      {meta.map(item => <meta key={item.name} {...item} />)}
      <meta
        name="ice-meta-count"
        content={meta.length.toString()}
      />
    </>
  );
}

export function Title() {
  const { pageData } = useDocumentContext();
  const title = pageData.pageConfig.title || [];

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageAssets, entryAssets, pageData } = useDocumentContext();
  const customLinks = pageData.pageConfig.links || [];
  const blockLinks = customLinks.filter((link) => link.block);

  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        blockLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} data-custom-link />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { pageData, pageAssets, entryAssets, appData, assetsManifest } = useDocumentContext();
  const { links: customLinks = [], scripts: customScripts = [] } = pageData.pageConfig;

  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const blockScripts = customScripts.filter(script => script.block);
  const deferredScripts = customScripts.filter(script => !script.block);
  const deferredLinks = customLinks.filter(link => !link.block);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_ASSETS_MANIFEST__=${JSON.stringify(assetsManifest)}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_DATA__=${JSON.stringify(appData)}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_PAGE_DATA__=${JSON.stringify(pageData)}` }} />
      {
        blockScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} {...props} data-custom-script />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script} src={script} />;
        })
      }
      {
        deferredLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} data-custom-link />;
        })
      }
      {
        deferredScripts.map(script => {
          const { block, ...props } = script;
          // TODO： defer 属性会导致 CSR 、SSR 渲染不一致，先移除
          return <script key={script.src} {...props} data-custom-script />;
        })
      }
    </>
  );
}

export function Main() {
  const { appElement } = useDocumentContext();

  return (
    <div id="ice-container">
      {appElement}
    </div>
  );
}
