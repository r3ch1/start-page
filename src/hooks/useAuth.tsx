import { useState } from 'react';

const tokenName = 'gAccessToken';
export default function useAuth() {
  const getToken = () => {
    const tokenString = localStorage.getItem(tokenName);
    if (!tokenString) return null;
    // const userToken = JSON.parse(tokenString);
    const userToken = tokenString;
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any) => {
    // localStorage.setItem(tokenName, JSON.stringify(userToken));

    // setToken(userToken.token);
    localStorage.setItem(tokenName, userToken);
    setToken(userToken);
  };

  const deleteToken = () => {
    setToken('');
  };

  return {
    setToken: saveToken,
    token,
    deleteToken,
  };
}
