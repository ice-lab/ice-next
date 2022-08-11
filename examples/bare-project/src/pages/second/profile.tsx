import './profile.css';
export default function Profile() {
  return (
    <>
      <view className="title">second profile</view>
    </>
  );
}

export function getConfig() {
  return {
    title: 'Second profile',
  };
}
