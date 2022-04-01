import type { PageConfig } from './types';

/**
 * update page config to document
 */
export async function updatePageConfig(pageConfig: PageConfig) {
  const {
    title,
    meta,
    links,
    scripts,
  } = pageConfig;

  document.title = title || '';

  updateMeta(meta);

  await updateLinks(links);
  await updateScripts(scripts);
}

/**
 * find meta by 'next-meta-count' and update it
 */
function updateMeta(meta): void {
  const headEl = document.head;
  const metaCountEl: HTMLMetaElement = headEl.querySelector(
    'meta[name=ice-meta-count]',
  ) as HTMLMetaElement;

  const headCount = Number(metaCountEl.content);
  const oldTags: Element[] = [];

  for (
    let i = 0, j = metaCountEl.previousElementSibling;
    i < headCount;
    i++, j = j?.previousElementSibling
  ) {
    if (j?.tagName?.toLowerCase() === 'meta') {
      oldTags.push(j!);
    }
  }

  const newTags = meta.map(item => {
    return reactElementToDOM('meta', item);
  });

  oldTags.forEach((t) => t.parentNode!.removeChild(t));
  newTags.forEach((t) => headEl.insertBefore(t, metaCountEl));

  metaCountEl.content = (newTags.length).toString();
}

const DOMAttributeNames: Record<string, string> = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule',
};

/**
 * map element props to dom
 * https://github.com/vercel/next.js/blob/canary/packages/next/client/head-manager.ts#L9
 */
function reactElementToDOM(type, props): HTMLElement {
  const el: HTMLElement = document.createElement(type);
  for (const p in props) {
    if (p === 'children' || p === 'dangerouslySetInnerHTML') continue;

    // we don't render undefined props to the DOM
    if (props[p] === undefined) continue;

    const attr = DOMAttributeNames[p] || p.toLowerCase();
    if (
      type === 'script' &&
      (attr === 'async' || attr === 'defer' || attr === 'noModule')
    ) {
      (el as HTMLScriptElement)[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  const { children, dangerouslySetInnerHTML } = props;
  if (dangerouslySetInnerHTML) {
    el.innerHTML = dangerouslySetInnerHTML.__html || '';
  } else if (children) {
    el.textContent =
      typeof children === 'string'
        ? children
        : Array.isArray(children)
        ? children.join('')
        : '';
  }
  return el;
}

const looseToArray = <T extends {}>(input: any): T[] => [].slice.call(input);

/**
 * Load links for current page.
 * If link already exists, don't load it again.
 * Remove links for the last page.
 */
async function updateLinks(links = []) {
  const tags = [];
  const blockTags = [];

  const oldStyleTags: HTMLStyleElement[] = looseToArray<HTMLStyleElement>(
    document.querySelectorAll('link[data-custom-link]'),
  );

  const oldStyleMap = new Map();

  oldStyleTags.forEach((tag) => {
    const href = tag.getAttribute('href');
    oldStyleMap.set(href, tag);
  });

  links.forEach(item => {
    const { block, ...props } = item;
    const { href } = props;

    if (oldStyleMap.has(href)) {
      // If already loaded, delete from the map.
      oldStyleMap.delete(href);
    } else {
      // Create link tags for the new page.
      const tag = reactElementToDOM('link', props);
      tag.setAttribute('data-custom-link', 'true');

      if (block) {
        blockTags.push(tag);
      } else {
        tags.push(tag);
      }
    }
  });

  const headEl = document.getElementsByTagName('head')[0];

  if (blockTags.length) {
    await Promise.all(blockTags.map(tag => {
      return loadPromise(tag, () => headEl.appendChild(tag));
    }));
  }

  // Delete style for the last page.
  oldStyleMap.forEach((tag) => {
    tag.parentNode!.removeChild(tag);
  });

  tags.forEach((tag) => {
    headEl.appendChild(tag);
  });
}

/**
 * Load scripts for current page.
 * If script already exists, don't load it again.
 * Script tags for the last page, has no need to be removed,
 * because they will not be unload by the javascript runtime.
 */
async function updateScripts(scripts = []) {
  const tags = [];
  const blockTags = [];

  const oldTags: HTMLScriptElement[] = looseToArray<HTMLScriptElement>(
    document.querySelectorAll('script[data-custom-script]'),
  );

  const oldScripts: Set<string | null> = new Set(
    oldTags.map((tag) => tag.getAttribute('src')),
  );

  scripts.forEach(item => {
    const { block, ...props } = item;
    const { src } = props;

    if (!oldScripts.has(src)) {
      const tag = reactElementToDOM('script', props);
      tag.setAttribute('data-custom-script', 'true');

      if (block) {
        blockTags.push(tag);
      } else {
        tags.push(tag);
      }
    }
  });

  if (blockTags.length) {
    await Promise.all(blockTags.map(tag => {
      return loadPromise(tag, () => document.body.appendChild(tag));
    }));
  }

  tags.forEach((tag) => {
    document.body.appendChild(tag);
  });
}

function loadPromise(el: HTMLElement, load) {
  return new Promise<void>((resolve, reject) => {
    el.addEventListener('load', () => {
      resolve();
    });
    el.addEventListener('error', (e) => {
      reject(e);
    });

    load();
  });
}