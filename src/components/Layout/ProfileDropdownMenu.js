import { useState, useContext } from 'react';

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GrUserSettings } from 'react-icons/gr';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';
import classes from './ProfileDropdownMenu.module.css';

const ProfileDropdownMenu = () => {
  const [dropdownShouldBeVisible, setDropdownShouldBeVisible] = useState(true);
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className={classes.dropdown}>
      <button type="button" className={classes.dropbtn}>
        <GrUserSettings size={32} />
        <FontAwesomeIcon icon={solid('caret-down')} color="black" />
      </button>
      <div
        className={classes.dropdownContent}
        style={{ display: !dropdownShouldBeVisible && 'none' }}
        onClick={() => setDropdownShouldBeVisible(false)}
        onMouseLeave={() => setDropdownShouldBeVisible(true)}
      >
        <Link to="profile">My Profile</Link>
        <Link to="changepassword">Change Password</Link>
        <Link to="login">
          <span type="button" onClick={logoutHandler}>
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdownMenu;
