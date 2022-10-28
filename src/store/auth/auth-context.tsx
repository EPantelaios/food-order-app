import React from 'react';

type Props = {
  token: string;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: Date) => void;
  logout: () => void;
};

const AuthContext = React.createContext<Props>({
  token: '',
  isLoggedIn: false,
  // eslint-disable-next-line
  login: (token, expirationTime) => {},
  logout: () => {},
});

export default AuthContext;
