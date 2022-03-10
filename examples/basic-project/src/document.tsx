/* eslint-disable react/self-closing-comp */
import React from 'react';
// import { Script } from 'ice';

function Document() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ICE Demo</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="./main.js"></script>
        <script src="./PagesHome.js"></script>
        <link rel="stylesheet" href="./PagesHome.css" />
      </body>
    </html>
  );
}

export default Document;