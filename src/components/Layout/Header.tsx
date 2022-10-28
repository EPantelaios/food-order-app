import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import mealsImage from '../../assets/meals.jpg';
import MoonThemeIcon from '../../assets/MoonThemeIcon';
import SunThemeIcon from '../../assets/SunThemeIcon';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import Profile from './Profile';

type Props = {
  currentTheme: string;
  onSwitchTheme: () => void;
  onShowCart: () => void;
};

const Header = (props: Props) => {
  const location = useLocation();
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
            <h1>OrderFood</h1>
          </Link>
        </div>
        <div className={classes.headerNavbarRight}>
          <div className={classes.cartIcon}>
            <HeaderCartButton onClick={props.onShowCart} />
          </div>
          <div className={classes.login}>
            <Profile />
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
      {location.pathname === '/' ? (
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
