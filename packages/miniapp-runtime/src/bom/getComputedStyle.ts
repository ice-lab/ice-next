import type { TaroElement } from '../dom/element.js';
import type { Style } from '../dom/style.js';

export function getComputedStyle(element: TaroElement): Style {
  return element.style;
}
