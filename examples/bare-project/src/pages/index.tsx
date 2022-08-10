// import './index.css';
import { useAppData, useConfig, useData } from 'ice';

export default function Home() {
  const appData = useAppData();
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ Home ~ appData', appData);
  const config = useConfig();
  console.log('🚀 ~ file: index.tsx ~ line 8 ~ Home ~ config', config);
  const data = useData();
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Home ~ data', data);
  return (
    <>
      <view className="title">Home Page</view>
      <view className="data">
        <view>foo: </view>
        <view>users:</view>
        <view>userInfo: </view>
      </view>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Home',
  };
}

export function getData(options) {
  // options comes from onLoad in miniapp page config
  console.log('options', options);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}
