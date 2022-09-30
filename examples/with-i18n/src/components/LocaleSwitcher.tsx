import { FormattedMessage } from 'react-intl';
import { useLocale, Link, useLocation } from 'ice';

export default function LocaleSwitcher() {
  const location = useLocation();

  const [, setLocale] = useLocale();
  const localesInfo = [
    { locale: 'zh-CN', name: '简体中文' },
    { locale: 'zh-HK', name: '繁體中文' },
    { locale: 'en-US', name: 'English' },

  ];

  return (
    <div>
      <p><FormattedMessage id="localeSwitcher" />:</p>
      <ul>
        {
          localesInfo.map(({ locale, name }) => {
            return (
              <li key={locale}>
                <Link
                  to={location.pathname}
                  onClick={() => setLocale(locale)}
                >{name}</Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}
