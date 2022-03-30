/**
 * update page config to document
 */
export async function updatePageConfig(pageConfig) {
  const {
    title,
    meta,
    links,
    scripts,
  } = pageConfig;

  document.title = title || '';

  updateMeta(meta);

  await loadLinks(links);
  await loadScript(scripts);
}

/**
 * find meta by 'next-meta-count' and update it
 */
function updateMeta(meta): void {
  const headEl = document.getElementsByTagName('head')[0];
  const headCountEl: HTMLMetaElement = headEl.querySelector(
    'meta[name=next-meta-count]',
  ) as HTMLMetaElement;

  const headCount = Number(headCountEl.content);
  const oldTags: Element[] = [];

  for (
    let i = 0, j = headCountEl.previousElementSibling;
    i < headCount;
    i++, j = j!.previousElementSibling
  ) {
    if (j?.tagName?.toLowerCase() === 'meta') {
      oldTags.push(j!);
    }
  }

  const newTags = meta.map(item => {
    return reactElementToDOM('meta', item);
  });

  oldTags.forEach((t) => t.parentNode!.removeChild(t));
  newTags.forEach((t) => headEl.insertBefore(t, headCountEl));

  headCountEl.content = (newTags.length).toString();
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

async function loadLinks(links = []) {
  const tags = [];
  const blockTags = [];

  links.forEach(item => {
    const { block, ...props } = item;

    const tag = reactElementToDOM('link', props);

    if (block) {
      blockTags.push(tag);
    } else {
      tags.push(tag);
    }
  });

  const headEl = document.getElementsByTagName('head')[0];

  if (blockTags.length) {
    await Promise.all(blockTags.map(tag => {
      return loadPromise(tag, () => headEl.appendChild(tag));
    }));
  }

  tags.forEach((tag) => {
    headEl.appendChild(tag);
  });
}

async function loadScript(scripts = []) {
  const tags = [];
  const blockTags = [];

  scripts.forEach(item => {
    const { block, ...props } = item;

    const tag = reactElementToDOM('script', props);

    if (block) {
      blockTags.push(tag);
    } else {
      tags.push(tag);
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