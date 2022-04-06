import * as React from 'react';
import { getPageAssets, getEntryAssets } from './assets.js';
import { useAppContext } from './AppContext.js';

export function Meta() {
  const { pageData } = useAppContext();
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
  const { pageData } = useAppContext();
  const title = pageData.pageConfig.title || [];

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageData, matches, assetsManifest } = useAppContext();

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const customLinks = pageData.pageConfig.links || [];
  const blockLinks = customLinks.filter((link) => link.block);

  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        blockLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { pageData, initialData, matches, assetsManifest } = useAppContext();

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const { links: customLinks = [], scripts: customScripts = [] } = pageData.pageConfig;

  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const blockScripts = customScripts.filter(script => script.block);
  const deferredScripts = customScripts.filter(script => !script.block);
  const deferredLinks = customLinks.filter(link => !link.block);

  const appContext = {
    initialData,
    pageData,
    matches,
    assetsManifest,
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` }} />
      {
        blockScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} defer {...props} />;
        })
      }
      {/*
       * Script must be deferred.
       * If there are other dom after this tag, and hydrate before parsed all dom,
       * hydrate will fail due to inconsistent dom nodes.
       */}
      {
        scripts.map(script => {
          return <script key={script} defer src={script} />;
        })
      }
      {
        deferredLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} />;
        })
      }
      {
        deferredScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} defer {...props} />;
        })
      }
    </>
  );
}

export function Main(props) {
  return (
    <div id="ice-container">
      {props.children}
    </div>
  );
}
