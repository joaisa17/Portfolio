import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0ProviderWithHistory } from './Components';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('main')
);
