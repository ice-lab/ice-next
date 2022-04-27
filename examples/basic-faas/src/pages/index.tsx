import { useRequest } from 'ahooks';

export default function Home() {
  const { data } = useRequest(() => fetch('/api/user').then(res => res.json()));
  return (
    <>
      <div>Home</div>
      <div>data: {JSON.stringify(data)}</div>
    </>
  );
}
