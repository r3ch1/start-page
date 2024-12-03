import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Context as AuthContext } from '../../context/AuthContext';
const LogedUser = ({ user }: { user: any }) => {
  const { token, deleteToken }: any = useContext(AuthContext);

  return (
    <>
      {token && (
        <Dropdown style={{ display: 'inline-block' }}>
          <Dropdown.Toggle id="dropdown-basic">
            <img className="rounded-circle" style={{ width: '30px', marginRight: '5px' }} src={user.picture} />
            {user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => deleteToken()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        // <div className="btn btn-default btn-rounded">
        //   {/* <img src={user.picture} /> */}
        //   {user.name}
        // </div>
      )}
    </>
  );
};

export default LogedUser;
