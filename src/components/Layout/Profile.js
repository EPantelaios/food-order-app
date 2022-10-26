import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';

import { GrUserSettings } from 'react-icons/gr';
import classes from './Profile.module.css';

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className={classes.headerButtons}>
      {!isLoggedIn && (
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      )}

      {/* <UserProfile /> */}

      {isLoggedIn && (
        <span className={classes.profile}>
          <Link to="/changepassword">
            <button type="button">
              <GrUserSettings size={32} />
            </button>
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

export default Profile;
