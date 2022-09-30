import type { I18nConfig } from 'src/types.js';
import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_KEY } from '../constants.js';

export default function getLocaleFromCookie(
  locales: I18nConfig['locales'],
  headers: { [key: string]: string | string[] | undefined } = {},
) {
  let cookies: Cookies;
  // TODO: how to distinguish server and client
  if (typeof window === 'undefined') {
    cookies = new Cookies(headers.cookie);
  } else {
    cookies = new Cookies();
  }
  const iceLocale = cookies.get(LOCALE_COOKIE_KEY);
  const locale = locales.find(locale => iceLocale === locale) || undefined;

  return locale;
}
