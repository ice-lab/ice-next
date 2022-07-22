
import { TaroElement } from '../dom/element.js';
import { TaroNode } from '../dom/node.js';
import { setInnerHTML } from '../dom-external/inner-html/html.js';
import { getBoundingClientRectImpl, getTemplateContent } from './element.js';
import { cloneNode, contains } from './node.js';

TaroNode.extend('innerHTML', {
  set(html: string) {
    setInnerHTML.call(this, this, html);
  },
  get(): string {
    return '';
  },
});
TaroNode.extend('cloneNode', cloneNode);
TaroNode.extend('contains', contains);
TaroElement.extend('getBoundingClientRect', getBoundingClientRectImpl);
TaroElement.extend('content', {
  get() {
    return getTemplateContent(this);
  },
});
