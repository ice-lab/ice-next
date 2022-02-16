import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Hello, React!</h1>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App name="world" />, document.getElementById('ice-container'));
