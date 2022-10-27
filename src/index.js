import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './components/error-boundary/error-boundary';
import AuthProvider from './store/auth/AuthProvider';
import CartProvider from './store/cart/CartProvider';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </BrowserRouter>
);
