import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';

import { GrUserSettings } from 'react-icons/gr';
import classes from './Login.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className={classes.headerButtons}>
      {!isLoggedIn && (
        <button>
          <Link to="/login">Login</Link>
        </button>
      )}
      {isLoggedIn && (
        <span className={classes.profile}>
          <Link to="/profile">
            <GrUserSettings size={32} color="white" />
          </Link>
        </span>
      )}

      {/* {isLoggedIn && (
        <button className={classes.buttonLogout} onClick={logoutHandler}>
          <Link to="/login">Logout</Link>
        </button>
      )} */}
    </div>
  );
};

export default MainNavigation;
