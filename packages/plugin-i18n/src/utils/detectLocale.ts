import type { I18nConfig } from '../types.js';
import { getLocaleFromCookies } from './cookies.js';

export default function detectLocale(i18nConfig: I18nConfig): string {
  // TODO: support when i18nRouting is false
  return getLocaleFromCookies() || i18nConfig.defaultLocale;
}
