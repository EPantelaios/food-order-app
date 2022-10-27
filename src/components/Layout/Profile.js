import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';
import ProfileDropdownMenu from './ProfileDropdownMenu';

import classes from './Profile.module.css';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className={classes.headerButtons}>
      {!isLoggedIn && (
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      )}
      {isLoggedIn && (
        <div className={classes.profile}>
          <ProfileDropdownMenu />
        </div>
      )}
    </div>
  );
};

export default Profile;
