import React from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  // eslint-disable-next-line
  login: (token) => {},
  logout: () => {},
});

export default AuthContext;
