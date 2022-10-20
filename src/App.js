import { useState, useEffect } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import useLocalStorage from 'use-local-storage';

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
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} currentTheme={theme} />}
        <Header
          currentTheme={theme}
          onShowCart={showCartHandler}
          onSwitchTheme={switchTheme}
        />
        <Meals />
      </CartProvider>
    </div>
  );
}

export default App;
