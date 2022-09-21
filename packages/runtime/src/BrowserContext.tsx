// Ref: https://github.com/facebook/docusaurus/blob/v2.1.0/packages/docusaurus/src/client/browserContext.tsx
import React, { type ReactNode, useEffect, useState, createContext } from 'react';

export const Context = createContext<boolean>(false);

export function BrowserProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return <Context.Provider value={isBrowser}>{children}</Context.Provider>;
}
