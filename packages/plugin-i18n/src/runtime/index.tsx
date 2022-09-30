import React from 'react';
import type { RuntimePlugin } from '@ice/types';
import type { History } from 'history';
import { PLUGIN_NAME } from '../constants.js';
import type { I18nConfig } from '../types.js';
import detectLocale from '../utils/detectLocale.js';
import normalizeLocalePath from '../utils/normalizeLocalePath.js';
import getLocaleFromCookie from '../utils/getLocaleFromCookie.js';
import { I18nProvider } from './I18nContext.js';

const runtime: RuntimePlugin = async ({ addProvider, history, appContext }, pluginData) => {
  const i18nConfig = pluginData[PLUGIN_NAME] as I18nConfig;
  if (!i18nConfig) {
    console.error(`The key ${PLUGIN_NAME} doesn't exist in \`pluginData\`.`);
    return;
  }

  addProvider(({ children }) => {
    return (
      <I18nProvider
        i18nConfig={i18nConfig}
        pathname={appContext.routePath}
      >
        {children}
      </I18nProvider>
    );
  });

  if (i18nConfig.i18nRouting && history) {
    modifyHistory(history, i18nConfig);
  }
};

function modifyHistory(history: History, i18nConfig: I18nConfig) {
  const originHistory = { ...history };
  const { defaultLocale } = i18nConfig;
  // TODO: cookie blocked
  const cookieBlocked = false;

  function getLocalePath(pathname: string, locale: string) {
    // TODO: basename, now we mock to '/'
    const basename = '/';
    const { pathname: newPathname } = normalizeLocalePath({ pathname, i18nConfig, basename });
    if (locale === defaultLocale) {
      return newPathname;
    }
    return `${basename === '/' ? '' : basename}/${locale}${newPathname === '/' ? '' : newPathname}`;
  }

  function getPathname(path: string | Location): string {
    if (isLocationObject(path)) {
      return path.pathname;
    }
    return path;
  }

  history.push = (path: string | Location, state?: unknown, localeParam?: string) => {
    const pathname = getPathname(path);
    const locale = localeParam ||
      (cookieBlocked ? detectLocale({ i18nConfig, pathname }) : getLocaleFromCookie(i18nConfig.locales)) ||
      defaultLocale;
    const localePath = getLocalePath(pathname, locale);
    originHistory.push(localePath, state);
  };

  history.replace = (path: string | Location, state?: unknown, localeParam?: string) => {
    const pathname = getPathname(path);
    const locale = localeParam ||
      (cookieBlocked ? detectLocale({ i18nConfig, pathname }) : getLocaleFromCookie(i18nConfig.locales)) ||
      defaultLocale;
    const localePath = getLocalePath(pathname, locale);
    originHistory.replace(localePath, state);
  };
}

function isLocationObject(path: Location | string): path is Location {
  return typeof path === 'object';
}

export default runtime;
