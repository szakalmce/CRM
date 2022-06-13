import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { GlobalStyles } from './styles/GlobalStyled';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <GlobalStyles />
      <App />
    </Router>
  </Provider>
);
