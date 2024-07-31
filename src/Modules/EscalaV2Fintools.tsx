import moment from 'moment';
import { useEffect, useState } from 'react';

const EscalaV2Fintools = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const [data, setData] = useState([]) as any[];

  const initializeGapiClient = async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  };

  const getDados = async () => {
    let response;
    try {
      response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: process.env.REACT_APP_ESCALA_SHEET_ID,
        range: "'escala RJ'!A1:ZZ",
      });
    } catch (err) {
      console.log(err);
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length === 0) {
      console.log('sem dados');
      return;
    }
    const startWeek = moment().day(0);
    const endWeek = moment().day(6);
    const userIndex = range.values[0].indexOf('Heric');
    const presencialInWeek: any[] = [];
    range.values.forEach((item: any) => {
      if (moment(item[0], 'DD/M').isBetween(startWeek, endWeek) && item[userIndex].toLocaleLowerCase() === 'x') {
        presencialInWeek.push({
          date: moment(item[0], 'DD/M').format('YYYY-MM-DD'),
          isOffice: true,
        });
      }
    });
    setData(presencialInWeek);
  };

  const handleAuthClick = () => {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      await getDados();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };

  useEffect(() => {
    gapi.load('client', initializeGapiClient);
  }, []);
  return (
    <div className="row">
      {[1, 2, 3, 4, 5].map((day: number) => {
        return (
          <div className={moment().day(day).isSame(moment()) ? 'col bg-primary' : 'col'}>
            <p>{moment().day(day).format('DD/MM')}</p>
            {data.length !== 0 && (
              <p>
                {data.find((item: any) => item.date === moment().day(day).format('YYYY-MM-DD')) !== undefined
                  ? 'OFFICE'
                  : 'HOUSE'}
              </p>
            )}
          </div>
        );
      })}
      {!data.length && (
        <div className="col-12">
          <button className="btn btn-primary w-100" onClick={() => handleAuthClick()}>
            Authorize
          </button>
        </div>
      )}
    </div>
  );
};
export default EscalaV2Fintools;
