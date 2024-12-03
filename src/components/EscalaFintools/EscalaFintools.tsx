import { useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
const EscalaFintools = () => {
  // const { token, deleteToken, teste } = useAuth();
  const { token }: any = useContext(AuthContext);
  return <>{JSON.stringify(token)}</>;
};
export default EscalaFintools;
