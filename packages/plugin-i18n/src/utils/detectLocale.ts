import type { I18nConfig } from '../types.js';
import getLocaleFromCookie from './getLocaleFromCookie.js';
import normalizeLocalePath from './normalizeLocalePath.js';
import getPreferredLocale from './getPreferredLocale.js';

interface DetectLocaleParams {
  i18nConfig: I18nConfig;
  pathname: string;
  headers?: {
    [key: string]: string | string[];
  };
  basename?: string;
}

export default function detectLocale({
  i18nConfig,
  pathname,
  headers = {},
  basename = '/',
}: DetectLocaleParams): string {
  const pathLocale = (i18nConfig.i18nRouting && (normalizeLocalePath({ pathname, i18nConfig, basename })).pathLocale);
  const preferredLocale = getPreferredLocale(i18nConfig.locales, headers);

  const detectedLocale = (
    pathLocale ||
    getLocaleFromCookie(i18nConfig.locales, headers) ||
    preferredLocale ||
    i18nConfig.defaultLocale
  );

  return detectedLocale;
}
