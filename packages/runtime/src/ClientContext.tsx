// Ref: https://github.com/facebook/docusaurus/blob/v2.1.0/packages/docusaurus/src/client/browserContext.tsx
import React, { type ReactNode, useEffect, useState, createContext } from 'react';

export const Context = createContext<boolean>(false);

export function ClientProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <Context.Provider value={mounted}>{children}</Context.Provider>;
}
