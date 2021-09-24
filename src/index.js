import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Footer } from '@Components';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@css/index.css';

import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <App />
    <Footer />
  </BrowserRouter>,
  document.getElementById('main')
);
