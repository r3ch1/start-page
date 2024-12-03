import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';
import useUserConfigs from '../hooks/useUserConfigs';

type AuthContextType = {
  token?: string | null;
  setToken: (token: string) => void;
  deleteToken: () => void;
  boxes: any[];
};

const Context = createContext({} as AuthContextType);

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { token, setToken, deleteToken } = useAuth();
  const { boxes } = useUserConfigs();

  const value = {
    token,
    setToken,
    deleteToken,
    boxes,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, AuthProvider };
