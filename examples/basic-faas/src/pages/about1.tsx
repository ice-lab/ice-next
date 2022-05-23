import { useRequest } from 'ahooks';
import hello from '../api';

export default function Home() {
  const { data } = useRequest(hello);
  return (
    <>
      <div>Home</div>
      <div>data: {JSON.stringify(data)}</div>
    </>
  );
}
