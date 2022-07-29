/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Meta, Title, Links, Main, Scripts, Data } from 'ice';

function Document(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main>
          {props.children}
        </Main>
        <Data />
        <Scripts />
      </body>
    </html>
  );
}

export default Document;