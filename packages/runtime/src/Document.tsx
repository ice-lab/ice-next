import * as React from 'react';
import { useAppContext } from './AppContext.js';
import { getPageAssets, getEntryAssets } from './assets.js';
import { getMeta, getTitle, getLinks, getScripts } from './pageConfig.js';

export function Meta() {
  const { matches, pageConfig } = useAppContext();

  const meta = getMeta(matches, pageConfig);

  return (
    <>
      {meta.map(item => <meta key={item.name} {...item} />)}
    </>
  );
}

export function Title() {
  const { matches, pageConfig } = useAppContext();

  const title = getTitle(matches, pageConfig);

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageConfig, matches, assetsManifest } = useAppContext();

  const customLinks = getLinks(matches, pageConfig);

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        customLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { pageData, pageConfig, initialData, matches, assetsManifest, documentOnly } = useAppContext();

  const customScripts = getScripts(matches, pageConfig);

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const appContext = {
    initialData,
    pageData,
    pageConfig,
    assetsManifest,
  };

  return (
    <>
      {/*
       * disable hydration warning for csr.
       * initial app data may not equal csr result.
       */}
      <script suppressHydrationWarning={documentOnly} dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` }} />
      {
        customScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} defer {...props} />;
        })
      }
      {/*
       * script must be deferred.
       * if there are other dom after this tag, and hydrate before parsed all dom,
       * hydrate will fail due to inconsistent dom nodes.
       */}
      {
        scripts.map(script => {
          return <script key={script} defer src={script} />;
        })
      }
    </>
  );
}

export function Main(props) {
  const { documentOnly } = useAppContext();

  // disable hydration warning for csr.
  // document is rendered by hydration.
  // initial content form "ice-container" is empty, which will not match csr result.
  return (
    <div id="ice-container" suppressHydrationWarning={documentOnly} >
      {props.children}
    </div>
  );
}