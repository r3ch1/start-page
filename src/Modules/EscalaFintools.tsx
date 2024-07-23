import { useEffect } from 'react';
import useGoogleSheets from 'use-google-sheets';

// const EscalaFintools = () => {
//   const SPREADSHEET_ID = 'read-my-office-day';
//   const SHEET_ID = '1M4RyB67sc4aIeyj23-fW6eCLujHpH13Rr6dBK4Uzdlo';
//   const CLIENT_EMAIL = 'read-sheet@read-my-office-day.iam.gserviceaccount.com';
//   const PRIVATE_KEY =
//     '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD6T1t2uLIaeeTq\nDF7lHlsUg49q8nwkDkpFu7An3Tk6JkrMjL014BUKfqtnOsWTcZfnmuTP4W2OM9LO\nZ81W+91z0TQhOHSFGXrSCilV94QI+oHLw/ePMLoj0229d92XRxhwk21ZoyMJFD8A\nzHz+9ers8vYI2fKE5EvElS6xCD0Bxlmiq7kg75KAAr5Kk1cY8+unzoE4xHh0fX0A\n0hM5MZBVKjIqzfSDUjLCEQPSWbDSM/W2nTdbBNzmTQNaEMCooESoK46cOF8zuwvF\n21NNY1KCakaQViCvK9w42/RmOADLbI2JzxEEWLz8StUTsx6MC4fs/gyALz1dm7A5\nAab2NTMnAgMBAAECggEAJp3KP+KhTNxeqI0IBtOhZuTKYiF5bXFBnB3R62nXGQAs\nrKn5zC9Uj63txkXsPUxaYcIlEr0gfb5uWKbtqEHAbyG9/Ry3PTbVGppeuNiFZ4KI\n4RAhR9dTSuZPboTo4XHNH3EJ1GO1VVfo8GKb1hRyYzkzI+JxO8yiCSNKyh0PQbqI\nn9eh35th3TSOG9EFTeH5XT+xJoP0Rv2HtpzFOfS3EjziIeiv0/QMN7ln0ZivdIei\nsO0kZ2fzd1Zav+aHq3XBU2SoCrpreQSusWueIaMcUIvzH3cYmVVYOq3AcZQwFeDE\n944N5689sF/cKEu7su4+8JGrf7oOa/OBqx5lpzdfgQKBgQD/yDVTea+esK8AMmK3\n5U+/+m9qwUnKqJbsuRNF11cLAbZ6gKYWJ4JATxAoezj3E97ewC4mnxdOG5gO9Rna\nUia74rM3TcK6aNGoi409fk/fiP+3+9rRmqReGRSGgP7OmHkVXXeeY6z8iGDE6gh8\ni/75QBAVcqPGnCpilpn0TuIVNwKBgQD6hfSUzRivs53cznJsyt6PbFLOVXSIC8u5\nQs3c+kwQAPHEUkZ6ey2gQATReVjxUKLkTw6uchYhu29j+w/B/uZSbEKtaMwdOlCZ\nMKij3y6CPgsGecFb1JtNx5UMWMRYZYBgxP582Ld/x2WK8WRPulHaOdxohIrNQ8YZ\ntoYydfnJkQKBgQDGbPF5fYgRKm3IUE4m7RzOCKDQh3wQXHMg136tCp366uw94nl1\n7FZuPyeAz/7kJiUaVqo2yepRbLSsvdW9eUeVMAvp1kg/RjuHbiM21jtuZSBEAXzC\naB4k5X33zjBd4wjj2yuF0zuKeN3hRNEqlYxKnjkb+mA1Hkb/TmfGkD9xRwKBgA1Y\nQ14FytHZLIiNirTW3aIgMA0DqlBw6Go278Zcot6bXkWJ6G0v0I9fuaH658z68aJd\nv7d1Jk6nsFhQEFfSHyy2zZp1IaJQ7+gpGmKYSd7wNSAkLjOZEKjE/+CHffYDeiIt\nfCzkUmoBEhyjnSdOEnwgZug+XzJt8Mh/24gmlqaxAoGAfKNkF4wwL4a3TRi8C9Js\nwUcEe9P2vo+JlOaqDzea54y9CPDiWVQYIoGTpmwsN2UlyEEc8wMnz0CbdShTmxnc\n6IPZDAHMGJAhNLYIW27wQiA9QIyuVE5Dog8z7fNnPaFBhUWSeKCTKMXYiWyXkrLf\nME1ycoLBvmmfpv8A8b2dxPo=\n-----END PRIVATE KEY-----\n';

//   let tokenClient: any;
//   let gapiInited = false;
//   let gisInited = false;
//   const handleAuthClick = () => {
//     tokenClient.callback = async (resp) => {
//       if (resp.error !== undefined) {
//         throw resp;
//       }
//       document.getElementById('signout_button').style.visibility = 'visible';
//       document.getElementById('authorize_button').innerText = 'Refresh';
//       await listMajors();
//     };

//     if (gapi.client.getToken() === null) {
//       // Prompt the user to select a Google Account and ask for consent to share their data
//       // when establishing a new session.
//       tokenClient.requestAccessToken({ prompt: 'consent' });
//     } else {
//       // Skip display of account chooser and consent dialog for an existing session.
//       tokenClient.requestAccessToken({ prompt: '' });
//     }
//   };
//   const { data, loading, error, refetch } = useGoogleSheets({
//     // apiKey: '104374678842771765530',
//     apiKey: 'AIzaSyBNkc71twpgu-UB3tSo1L5GnFsEztHf4mc',
//     sheetId: SHEET_ID,
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     console.log(error);
//     return <div>Error!</div>;
//   }

//   return (
//     <div>
//       <div>{JSON.stringify(data)}</div>

//       <button onClick={refetch}>Refetch</button>
//     </div>
//   );
// };

const EscalaFintools = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: 'AIzaSyBNkc71twpgu-UB3tSo1L5GnFsEztHf4mc',
    sheetId: '1M4RyB67sc4aIeyj23-fW6eCLujHpH13Rr6dBK4Uzdlo',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default EscalaFintools;
