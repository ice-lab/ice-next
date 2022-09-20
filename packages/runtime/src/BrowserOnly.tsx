import React, { isValidElement } from 'react';
import type { ComponentWithChildren } from '@ice/types';
import { useAppContext } from './AppContext.js';

const BrowserOnly: ComponentWithChildren<{ fallback: React.ReactNode }> = ({ children, fallback }) => {
  const { isBrowser } = useAppContext();

  // Ref https://github.com/facebook/docusaurus/blob/v2.1.0/packages/docusaurus/src/client/exports/BrowserOnly.tsx
  if (isBrowser) {
    if (
      typeof children !== 'function' &&
      process.env.NODE_ENV === 'development'
    ) {
      throw new Error(`Error: The children of <BrowserOnly> must be a "render function", e.g. <BrowserOnly>{() => <span>{window.location.href}</span>}</BrowserOnly>.
Current type: ${isValidElement(children) ? 'React element' : typeof children}`);
    }
    return <>{children?.()}</>;
  }

  return fallback ?? null;
};

export default BrowserOnly;
