import { useLocale, Link } from 'ice';
import { FormattedMessage } from 'react-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Home() {
  const [locale] = useLocale();
  console.log('home=====>', locale);
  return (
    <>
      <h2><FormattedMessage id="homeTitle" /></h2>
      <div><FormattedMessage id="currentLocale" />: {locale}</div>
      <LocaleSwitcher />
      <Link to="/about"><FormattedMessage id="aboutTitle" /></Link>
    </>
  );
}
