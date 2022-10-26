import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { ErrorBoundary } from './components/error-boundary/error-boundary';

import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';

import CartProvider from './store/cart/CartProvider';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const defaultLight = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultLight ? 'light' : 'dark'
  );

  useEffect(() => {
    theme === 'light'
      ? (document.body.style.backgroundColor = 'white')
      : (document.body.style.backgroundColor = 'grey');
  }, [theme]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const contentRender = (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} currentTheme={theme} />}
      <Header
        currentTheme={theme}
        onShowCart={showCartHandler}
        onSwitchTheme={switchTheme}
      />
    </>
  );

  return (
    <div data-theme={theme}>
      <ErrorBoundary>
        <Switch>
          <Route exact path="/">
            <CartProvider>
              {contentRender}
              <Meals />
            </CartProvider>
          </Route>

          <Route path="/login">
            <CartProvider>{contentRender}</CartProvider>
            <AuthPage />
          </Route>

          <Route path="/register">
            <CartProvider>{contentRender}</CartProvider>
            <AuthPage />
          </Route>

          <Route path="/profile">
            <CartProvider>{contentRender}</CartProvider>
            <ProfilePage />
          </Route>

          <Route path="/changepassword">
            <CartProvider>{contentRender}</CartProvider>
            <ChangePasswordPage />
          </Route>

          <Route path="*">
            <CartProvider>{contentRender}</CartProvider>
            <NotFoundPage />
          </Route>
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default App;
