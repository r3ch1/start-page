import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*
https://accounts.google.com/gsi/select?
  client_id=288000699238-qg64lc0ish8epjve4qdbar5cjkncuht3.apps.googleusercontent.com&
  ux_mode=popup&
  ui_mode=card&
  as=GRNarMLSvzZbpObU30%2BFjw&
  channel_id=99d6a6c87ea8a3fabecd87869c54527116ec164921697d7903bf41d70fe00e5a&
  origin=http%3A%2F%2Flocalhost%3A3000*/
/*


https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?
  redirect_uri=http%3A%2F%2Flocalhost%3A3000&
  response_type=token&
  client_id=288000699238-qg64lc0ish8epjve4qdbar5cjkncuht3.apps.googleusercontent.com&
  scope=openid%20email%20profile&
  service=lso&o2v=1&
  ddm=0&
  flowName=GeneralOAuthFlow*/
