import type { I18nConfig } from '../types.js';
import removeBasenameFromPath from './removeBasenameFromPath.js';

interface NormalizeLocalePathOptions {
  pathname: string;
  i18nConfig: I18nConfig;
  basename?: string;
}

export default function normalizeLocalePath({ pathname, i18nConfig, basename }: NormalizeLocalePathOptions) {
  const originPathname = removeBasenameFromPath(pathname, basename);
  const { locales } = i18nConfig;
  const subPaths = originPathname.split('/');
  let newPathname = originPathname;
  // 从路径获取 locale 时，默认路径不再命中默认语言，返回空字符串，调用业务需执行兜底默认语言
  let pathLocale = '';
  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    if (subPaths[1] && subPaths[1] === locale) {
      pathLocale = locale;
      subPaths.splice(1, 1);
      newPathname = subPaths.join('/') || '/';
      break;
    }
  }

  return {
    pathname: newPathname,
    pathLocale,
  };
}
