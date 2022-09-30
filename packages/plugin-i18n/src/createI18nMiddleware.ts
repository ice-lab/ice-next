import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { I18nConfig } from './types.js';
import detectLocale from './utils/detectLocale.js';
import getRedirectPath from './utils/getRedirectPath.js';

export default function createI18nMiddleware(i18nConfig: I18nConfig, basename?: string): Middleware {
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const detectedLocale = detectLocale({ i18nConfig, basename, pathname: req.path, headers: req.headers });
    const redirectPath = getRedirectPath({ pathname: req.path, i18nConfig, detectedLocale, basename });

    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  };

  return {
    name: 'plugin-i18n-redirect',
    middleware,
  };
}
