import type { ReactElement } from 'react';
import React, { createContext, useState, useContext } from 'react';
import type { I18nConfig } from '../types.js';
import setLocaleToCookie from '../utils/setLocaleToCookie.js';
import detectLocale from '../utils/detectLocale.js';

type ContextValue = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

interface I18nProvider {
  children: ReactElement;
  i18nConfig: I18nConfig;
  pathname: string;
}

export const I18nContext = createContext<ContextValue>(null);

I18nContext.displayName = 'I18nContext';

export const I18nProvider = ({ children, i18nConfig, pathname }: I18nProvider) => {
  const [locale, setLocale] = useState<string>(detectLocale({ i18nConfig, pathname }));

  function updateLocale(locale: string) {
    setLocaleToCookie(locale);
    setLocale(locale);
  }

  return (
    <I18nContext.Provider value={[locale, updateLocale]}>
      {children}
    </I18nContext.Provider>
  );
};

export function useLocale() {
  return useContext(I18nContext);
}

export function withLocale<Props>(Component: React.ComponentType<Props>) {
  const AuthWrapped = (props: Props) => {
    const [locale, setLocale] = useLocale();
    return <Component {...props} locale={locale} setLocale={setLocale} />;
  };
  return AuthWrapped;
}
