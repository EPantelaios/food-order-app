import { useState, useContext, useEffect } from 'react';

import AuthContext from '../../store/auth/auth-context';
import Card from '../UI/Card';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    emailVerified: boolean;
    lastLoginAt: string;
  }>({
    email: '',
    emailVerified: false,
    lastLoginAt: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const authCtx = useContext(AuthContext);

  const formatDate = (d: Date): string => {
    return (
      d.getFullYear().toString() +
      '-' +
      ((d.getMonth() + 1).toString().length === 2
        ? (d.getMonth() + 1).toString()
        : '0' + (d.getMonth() + 1).toString()) +
      '-' +
      (d.getDate().toString().length === 2
        ? d.getDate().toString()
        : '0' + d.getDate().toString()) +
      ' ' +
      (d.getHours().toString().length === 2
        ? d.getHours().toString()
        : '0' + d.getHours().toString()) +
      ':' +
      ((d.getMinutes() / 5) * 5 === 2
        ? ((d.getMinutes() / 5) * 5).toString()
        : '0' + ((d.getMinutes() / 5) * 5).toString())
    );
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (!authCtx.isLoggedIn) return alert('Error. You must be signed in');

      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD2QfKdRZO-ra906kvKUgScjMdIdbUjqM0',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { email, emailVerified, lastLoginAt } = responseData.users[0];
      const lastLoginAtDateFormat = formatDate(new Date(Number(lastLoginAt)));

      setUserInfo({ email, emailVerified, lastLoginAt: lastLoginAtDateFormat });
      setIsLoading(false);
    };

    getUserInfo().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [authCtx.isLoggedIn, authCtx.token]);

  return (
    <section className={classes.profile}>
      <Card>
        <div className={classes.cardContent}>
          <h1>Your User Profile</h1>
          {isLoading && (
            <div className={classes.loading}>
              <p>Loading...</p>
            </div>
          )}
          {httpError && (
            <div className={classes.httpError}>
              <p>{httpError}</p>
            </div>
          )}
          {!isLoading && !httpError && (
            <>
              <label htmlFor="email">Email Address:</label>
              <p>{userInfo?.email}</p>
              <div className={classes.emailVerify}>
                {userInfo?.emailVerified
                  ? 'Email is verified!'
                  : 'Email is not verified. Please check your mailbox and verify it.'}
              </div>
              <label htmlFor="Last login time">Last login at:</label>
              <p>{userInfo?.lastLoginAt}</p>
            </>
          )}
        </div>
      </Card>
    </section>
  );
};

export default UserProfile;
