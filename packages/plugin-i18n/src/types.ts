export interface I18nConfig {
  /**
   * The locales which you want to support in your app.
   */
  locales: string[];
  /**
   * The default locale which is used when visiting a non-locale prefixed path, e.g. `/home`.
   */
  defaultLocale: string;
  /**
   * Automatically redirect to the correct path which is based on user's preferred locale.
   */
  autoRedirect?: boolean;
  /**
   * If it's `true`, it will add a locale prefix to the path. e.g. /home -> /en-US/home
   */
  i18nRouting?: boolean;
}
