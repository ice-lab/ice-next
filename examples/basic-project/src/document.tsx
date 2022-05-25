import { Meta, Title, Links, Main, Scripts, useAppData } from 'ice';
import type { AppData } from './types';

function Document() {
  const appData = useAppData<AppData>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Title />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log('${appData?.title}')`,
          }}
        />
      </head>
      <body>
        <Main />
        <Scripts />
      </body>
    </html>
  );
}

export default Document;