import React from 'react';
import { runApp } from 'ice';
import Home from './Home';

runApp({
  app: {
    renderComponent: () => {
      return (
        <>
          <h2>Simple App</h2>
          <Home />
        </>
      );
  },
  },
});
