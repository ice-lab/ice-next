import React, { useContext } from 'react';
import { I18nContext } from './I18nContext.js';

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
