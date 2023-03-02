import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { store } from './store/index';
import { Main } from './user/main/main';
// import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
);
