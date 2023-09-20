import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './input.css';
import AccountProvider from './context/AccountProvider';
import CurrentChatProvider from './context/CurrentChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccountProvider>
      <CurrentChatProvider>
        <App />
      </CurrentChatProvider>
    </AccountProvider>

  </React.StrictMode>
);
