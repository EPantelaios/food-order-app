import { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import HeaderCartButton from './HeaderCartButton';

import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import SunThemeIcon from '../../assets/SunThemeIcon';
import MoonThemeIcon from '../../assets/MoonThemeIcon';
import Login from './Login';

import AuthContext from '../../store/auth-context';

const Header = (props) => {
  const location = useLocation();
  console.log('location', location);
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
        <div className={classes.headerTitle}>
          <Link to="/">
            <h1>Order Food</h1>
          </Link>
        </div>
        <div className={classes.headerNavbarRight}>
          <div className={classes.cartIcon}>
            <HeaderCartButton onClick={props.onShowCart} />
          </div>
          <div className={classes.login}>
            <Login />
          </div>
          <button
            type="button"
            id="theme-toggle"
            title="Toggles light & dark"
            aria-label="auto"
            aria-live="polite"
            className={classes.themeIcon}
            onClick={themeHandler}
          >
            {isLightTheme ? <MoonThemeIcon /> : <SunThemeIcon />}
          </button>
        </div>
      </header>
      {!location.pathname.includes('login') &&
      !location.pathname.includes('register') ? (
        <div className={classes['main-image']}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
      ) : (
        <div style={{ margin: '10rem' }} />
      )}
    </>
  );
};

export default Header;
