import { useState, useRef, useContext } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';

import AuthContext from '../../store/auth/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const passwordAgainInputRef = useRef<HTMLInputElement>();
  const location = useLocation();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(
    location.pathname === '/register' ? false : true
  );
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (
      location.pathname === '/register' &&
      enteredPassword &&
      enteredPassword !== passwordAgainInputRef.current.value
    ) {
      alert('Passwords must be the same');
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2QfKdRZO-ra906kvKUgScjMdIdbUjqM0';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2QfKdRZO-ra906kvKUgScjMdIdbUjqM0';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            const errorMessage = 'Authentication failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime: Date = new Date(
          // prettier-ignore
          new Date().getTime() + (+data.expiresIn * 1000 * 24) //convert milliseconds to seconds
        );
        authCtx.login(data.idToken, expirationTime);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {location.pathname === '/register' && (
          <div className={classes.control}>
            <label htmlFor="password">Enter Your Password Again</label>
            <input
              type="password"
              id="passwordagain"
              required
              ref={passwordAgainInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}

          <div className={classes.switchAuth}>
            <Link to={isLogin ? 'register' : 'login'}>
              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
