// import './index.css';

export default function Home() {
  return (
    <>
      <view className="title">About</view>
    </>
  );
}

export function getConfig() {
  return {
    title: 'About',
  };
}

export function getData(options) {
  // options comes from onLoad in miniapp page config
  console.log('about page options.pathname', options.pathname);
  console.log('about page options.query', options.query);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'About',
      });
    }, 1 * 100);
  });
}
