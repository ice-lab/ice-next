// import './index.css';

export default function Home() {
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

export function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}
