import { Button } from 'antd';
import 'antd/es/button/style';
import './index.less';

export default function Home() {
  return (
    <div>
      <h1 className="color">antd example</h1>
      <Button type="primary">Button</Button>
    </div>
  );
}