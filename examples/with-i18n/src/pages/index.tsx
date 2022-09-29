import { useLocale } from 'ice';

export default function Home() {
  const [locale] = useLocale();
  console.log('locale===========>', locale);
  return (
    <h1>Home</h1>
  );
}
