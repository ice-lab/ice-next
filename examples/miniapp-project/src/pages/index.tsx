import './index.scss';
import { useAppData, useConfig, useData, Link, useSearchParams, history } from 'ice';
import json from '../test.json';
import { test } from '../utils';
import url from './ice.png';

export default function Home() {
  console.log('process.env', process.env.ICE_APP_ID);
  const appData = useAppData();
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ Home ~ appData', appData);
  const config = useConfig();
  console.log('🚀 ~ file: index.tsx ~ line 8 ~ Home ~ config', config);
  const data = useData();
  console.log('🚀 ~ file: index.tsx ~ line 10 ~ Home ~ data', data);
  console.log('json', json);
  const [params] = useSearchParams();
  console.log('🚀 ~ file: index.tsx ~ line 15 ~ Home ~ params', params);
  // @ts-ignore
  console.log('ASSETS_VERSION', ASSETS_VERSION);
  function onClickDiv() {
    console.log('123');
    debugger;
  }
  return (
    <>
      <view className="title" onClick={() => { console.log(123123); }}>Home Page</view>
      <view className="data">
        <view>foo: </view>
        <view>users:</view>
        <view>userInfo: </view>
        {/* @ts-ignore */}
        <image src="https://v3.ice.work/img/logo.png" />
        {/* @ts-ignore */}
        <image src={url} />
        <Link to="/?hello=world">222</Link>
        <view onClick={() => { history.push('/?hello=computer'); }}>点我跳转本页</view>
        <view onClick={() => { history.push('/about?hello=computer'); }}>点我跳转 about 页</view>
        <view onClick={() => { history.push('/second/profile?hello=computer'); }}>点我跳转 second/profile 页</view>
        <div onClick={test}>嘻嘻，我是 div 标签</div>
        <view onClick={onClickDiv}>嘻嘻，我是 view 标签</view>
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
  console.log('options.pathname', options.pathname);
  console.log('options.query', options.query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}
