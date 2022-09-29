import Cookies from 'universal-cookie';
import { LOCALE_COOKIE_KEY } from '../constants.js';

const cookies = new Cookies();

export function setLocaleToCookies(locale: string) {
  // TODO: support cookie block
  cookies.set(LOCALE_COOKIE_KEY, locale);
}

export function getLocaleFromCookies() {
  return cookies.get(LOCALE_COOKIE_KEY);
}