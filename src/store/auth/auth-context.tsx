/* eslint-disable @typescript-eslint/no-unused-vars */
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
  login: (token, expirationTime) => {},
  logout: () => {},
});

export default AuthContext;
