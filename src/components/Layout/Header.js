import { useState } from 'react';

import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import SunThemeIcon from '../../assets/SunThemeIcon';
import MoonThemeIcon from '../../assets/MoonThemeIcon';

const Header = (props) => {
  const [isLightTheme, setIsLightTheme] = useState(
    props.currentTheme === 'light' ? true : false
  );

  const themeHandler = () => {
    props.onSwitchTheme();
    setIsLightTheme((prevState) => !prevState);
  };

  return (
    <>
      <header className={classes.header}>
        <h1 onClick={() => window.location.reload(false)}>Order Food</h1>
        <div className={classes.cartIcon}>
          <HeaderCartButton onClick={props.onShowCart} />
          <div
            id="theme-toggle"
            title="Toggles light & dark"
            aria-label="auto"
            aria-live="polite"
            className={classes.icon}
            onClick={themeHandler}
          >
            {isLightTheme ? <MoonThemeIcon /> : <SunThemeIcon />}
          </div>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
