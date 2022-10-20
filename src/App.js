import { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';

import { ErrorBoundary } from './components/error-boundary/error-boundary';
import CartProvider from './store/CartProvider';
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
          <Meals />
        </CartProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
