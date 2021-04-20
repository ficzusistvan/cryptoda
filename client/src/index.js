import React from 'react';
import ReactDOM from 'react-dom';
import 'bootswatch/dist/slate/bootstrap.min.css';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import store from "./redux/store";

import { HashRouter } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.css';

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
