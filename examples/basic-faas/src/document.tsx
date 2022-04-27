import { Meta, Title, Links, Main, Scripts } from 'ice';

function Document(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="FaaS Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main>
          {props.children}
        </Main>
        <Scripts />
      </body>
    </html>
  );
}

export default Document;