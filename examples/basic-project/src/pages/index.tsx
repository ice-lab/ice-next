// import './index.css';

export default function Home(props) {
  console.log('render Home', props);
  return (
    <>
      <h2 className="title">Home Page</h2>
      <div className="data">
        <div>foo: </div>
        <div>users:</div>
        <div>userInfo: </div>
      </div>
    </>
  );
}
