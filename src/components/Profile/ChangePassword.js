import { useRef, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';
import classes from './ChangePassword.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD2QfKdRZO-ra906kvKUgScjMdIdbUjqM0',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      history.replace('/');
    });
  };

  return (
    <>
      <section className={classes.passwordSection}>
        <h1>Change Your Password</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              minLength="7"
              ref={newPasswordInputRef}
            />
          </div>
          <div className={classes.action}>
            <button>Change Password</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ProfileForm;
