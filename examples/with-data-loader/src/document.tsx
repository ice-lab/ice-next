import { Meta, Title, Links, Main, Scripts } from 'ice';
// import { useAppContext } from '@ice/runtime';

function Document() {
  // const context = useAppContext();

  // console.log(context.assetsManifest);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3 Example for plugin request." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
