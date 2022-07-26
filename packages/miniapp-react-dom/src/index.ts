/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TaroElement } from '@ice/miniapp-runtime';
import { ensure, isFunction } from '@tarojs/shared';
import type { ReactNode } from 'react';

import { TaroReconciler } from './reconciler.js';
import { ContainerMap, createRoot, render } from './render.js';

const unstable_batchedUpdates = TaroReconciler.batchedUpdates;

function unmountComponentAtNode(dom: TaroElement) {
  ensure(dom && [1, 8, 9, 11].includes(dom.nodeType), 'unmountComponentAtNode(...): Target container is not a DOM element.');

  const root = ContainerMap.get(dom);

  if (!root) return false;

  unstable_batchedUpdates(() => {
    root.unmount(() => {
      ContainerMap.delete(dom);
    });
  }, null);

  return true;
}

function findDOMNode(comp?: TaroElement | ReactNode) {
  if (comp == null) {
    return null;
  }

  const { nodeType } = comp as TaroElement;
  if (nodeType === 1 || nodeType === 3) {
    return comp;
  }

  return TaroReconciler.findHostInstance(comp as Record<string, any>);
}

const portalType = isFunction(Symbol) && Symbol.for
  ? Symbol.for('react.portal')
  : 0xeaca;

function createPortal(
  children: ReactNode,
  containerInfo: TaroElement,
  key?: string,
) {
  return {
    $$typeof: portalType,
    key: key == null ? null : String(key),
    children,
    containerInfo,
    implementation: null,
  };
}

const Internals = {
  usingClientEntryPoint: false,
};

export {
  // Hack for import ReactDOM from 'react-dom/client'
  Internals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  createPortal,
  createRoot,
  findDOMNode,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
};

export default {
  render,
  createRoot,
  unstable_batchedUpdates,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
};
