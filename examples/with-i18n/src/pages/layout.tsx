import { Outlet, useLocale } from 'ice';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { messages } from '../locales';

function IntlProvider({ children }) {
  const intlLocale = useLocale();
  console.log('====>', intlLocale);
  const [locale, setLocale] = intlLocale;
  return (
    <ReactIntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale={'zh-CN'}
    >
      {children}
    </ReactIntlProvider>
  );
}

export default function layout() {
  return (
    <IntlProvider>
      <h1>icejs 3</h1>
      <Outlet />
    </IntlProvider>
  );
}
