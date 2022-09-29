import type { ReactElement } from 'react';
import React, { createContext, useState } from 'react';
import type { I18nConfig } from '../types.js';
import { setLocaleToCookies } from '../utils/cookies.js';
import detectLocale from '../utils/detectLocale.js';

type ContextValue = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

export const I18nContext = createContext<ContextValue>(['', () => { }]);

export const I18nProvider = ({ children, i18nConfig }: { children: ReactElement; i18nConfig: I18nConfig }) => {
  const [locale, setLocale] = useState<string>(() => detectLocale(i18nConfig));
  function updateLocale(locale: string) {
    setLocaleToCookies(locale);
    setLocale(locale);
  }

  return (
    <I18nContext.Provider value={[locale, updateLocale]}>
      {children}
    </I18nContext.Provider>
  );
};
