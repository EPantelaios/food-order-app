import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { ErrorBoundary } from './components/error-boundary/error-boundary';

import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';

import AuthContext from './store/auth/auth-context';
import CartProvider from './store/cart/CartProvider';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);

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

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div data-theme={theme}>
      <ErrorBoundary>
        <CartProvider>
          {cartIsShown && (
            <Cart onClose={hideCartHandler} currentTheme={theme} />
          )}
          <Header
            currentTheme={theme}
            onShowCart={showCartHandler}
            onSwitchTheme={switchTheme}
          />
          <Switch>
            <Route exact path="/">
              <Meals />
            </Route>
            <Route path="/login">
              {authCtx.isLoggedIn && <Redirect exact to="/" />}
              {!authCtx.isLoggedIn && <AuthPage />}
            </Route>
            <Route path="/register">
              {authCtx.isLoggedIn && <Redirect exact to="/" />}
              {!authCtx.isLoggedIn && <AuthPage />}
            </Route>
            <Route path="/profile">
              {authCtx.isLoggedIn && <ProfilePage />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/changepassword">
              {authCtx.isLoggedIn && <ChangePasswordPage />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </CartProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
