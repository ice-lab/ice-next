import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AppContext } from '@ice/types';

const Context = createContext<AppContext | undefined>(undefined);

Context.displayName = 'AppContext';

function useAppContext() {
  const value = useContext(Context);
  return value;
}

function AppContextProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AppContext;
}): JSX.Element {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <Context.Provider value={{ ...value, isBrowser }}>
      {children}
    </Context.Provider>
  );
}

export {
  useAppContext,
  AppContextProvider,
};
