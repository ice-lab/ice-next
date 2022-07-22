import type { TaroElement } from './element.js';
import { NodeType } from './node_types.js';

type Filter = (element: TaroElement) => boolean;

function returnTrue() {
  return true;
}

export function treeToArray(root: TaroElement, predict?: Filter): TaroElement[] {
  const array: TaroElement[] = [];
  const filter = predict ?? returnTrue;

  let object: TaroElement | null = root;

  while (object) {
    if (object.nodeType === NodeType.ELEMENT_NODE && filter(object)) {
      array.push(object);
    }

    object = following(object, root);
  }

  return array;
}

function following(el: TaroElement, root: TaroElement): TaroElement | null {
  const { firstChild } = el;

  if (firstChild) {
    return firstChild as TaroElement;
  }

  let current: TaroElement | null = el;

  do {
    if (current === root) {
      return null;
    }

    const { nextSibling } = current;

    if (nextSibling) {
      return nextSibling as TaroElement;
    }
    current = current.parentElement;
  } while (current);

  return null;
}
