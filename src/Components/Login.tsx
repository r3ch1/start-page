import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { redirect } from 'react-router-dom';
import axios from 'axios';

const GLoginOptions = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  scope:
    'https://www.googleapis.com/auth/spreadsheets.readonly \
    https://www.googleapis.com/auth/gmail.readonly',
  callback: '', // defined later
};
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

const accessToken = localStorage.getItem('gAccessToken');

const Login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const [token, setToken] = useState('');
  const handleGoogleLogin = () => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient(GLoginOptions);
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      console.log('LOGOU');
      console.log(resp.access_token);
      setToken(resp.access_token);
      localStorage.setItem('gAccessToken', resp.access_token);
      //   teste();
      //   return redirect('/home');
      //   await getDados();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      console.log('ESTA AQUI');
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  useEffect(() => {
    console.log('TOKEN');
    console.log(localStorage.getItem('gAccessToken'));
    if (token) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          console.log(res);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setToken(localStorage.getItem('gAccessToken') || '');
    }
  }, [token]);

  useEffect(() => {
    console.log('LOGADO');
    const redirectToHome = () => {
      return redirect('/home');
    };
    localStorage.setItem('gAccessToken', token);
    if (token !== '') {
      redirectToHome();
    }
    console.log(token);
  }, [token]);

  useEffect(() => {
    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    };
    console.log('CARREGA');
    console.log(window.gapi);
    if (window.gapi) {
      window.gapi.load('client', initializeGapiClient);
    }
  }, []);
  return (
    <div className="App container-fluid">
      <div className="row justify-content-center" style={{ paddingTop: '30vw' }}>
        <div className="col-4">
          <Card>
            <Card.Body>
              <h2>Sign In</h2>
              <div className="row">
                <div className="col">
                  <button className="btn btn-danger btn-rounded w-100" onClick={(e) => handleGoogleLogin()}>
                    Google
                  </button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
