import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LogedUser from '../LogedUser/LogedUser';
import Loading from '../../Components/Loading';
import { Context as AuthContext } from '../../context/AuthContext';
const GLoginOptions = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  scope:
    'https://www.googleapis.com/auth/spreadsheets.readonly \
      https://www.googleapis.com/auth/gmail.readonly',
  callback: '', // defined later
};
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

const Glogin = () => {
  const { token, setToken }: any = useContext(AuthContext);
  const [profile, setProfile] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const handleGoogleLogin = () => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient(GLoginOptions);
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      setToken(resp.access_token);
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  useEffect(() => {
    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    };
    if (window.gapi) {
      window.gapi.load('client', initializeGapiClient);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [token, setProfile]);

  return (
    <>
      <Loading isLoading={loading} />
      {!loading && (
        <>
          {profile && <LogedUser user={profile} />}
          {!profile && (
            <button className="btn btn-danger btn-rounded" onClick={(e) => handleGoogleLogin()}>
              Login
            </button>
          )}
        </>
      )}
    </>
  );
};
export default Glogin;
