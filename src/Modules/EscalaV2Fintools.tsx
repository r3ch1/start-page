import moment from 'moment';
import { useEffect, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

const EscalaV2Fintools = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const [users, setUsers] = useState([{ name: '', selected: false }]);
  const [data, setData] = useState([]) as any[];
  const [dataFull, setDataFull] = useState([]) as any[];

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
    setUsers(
      range.values[0]
        .filter((item: any) => item.trim() !== '' && item !== 'Total do dia')
        .map((item: any) => {
          return { name: item, selected: false };
        }),
    );
    setDataFull(range.values);
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

  const setChecked = (name: string) => {
    const selectedUser = users.find((user: any) => user.name === name);
    if (!selectedUser) {
      return false;
    }
    const index = users.indexOf(selectedUser);
    const _users = users.map((user: any) => {
      return { name: user.name, selected: false };
    });
    selectedUser.selected = !selectedUser.selected;
    _users.splice(index, 1);
    setUsers([...[selectedUser], ..._users]);
  };

  useEffect(() => {
    gapi.load('client', initializeGapiClient);
  }, []);

  useEffect(() => {
    const selectedUser = users.find((user: any) => user.selected);
    if (!dataFull.length || !selectedUser) return;
    const userIndex = dataFull[0].indexOf(selectedUser.name);
    const presencialInWeek: any[] = [];
    dataFull.forEach((item: any) => {
      if (item.length >= userIndex && item.length > 1 && item[userIndex].toLocaleLowerCase() === 'x') {
        presencialInWeek.push({
          date: moment(item[0], 'DD/M').format('YYYY-MM-DD'),
          isOffice: true,
        });
      }
    });
    setData(presencialInWeek);
  }, [users]);

  useEffect(() => {
    setChecked(process.env.REACT_APP_ESCALA_DEFAULT_USER || '');
  }, [dataFull]);
  return (
    <div className="row escala">
      <div className="col-12">
        {dataFull.length !== 0 &&
          users.map((user: any, i: number) => (
            <>
              <ToggleButton
                key={`users-button-${i}`}
                className="btn-sm item"
                id={`toggle-check-${user.name}`}
                type="checkbox"
                variant="outline-primary"
                checked={user.selected}
                value={user.name}
                onChange={(e) => setChecked(e.currentTarget.value)}
              >
                {user.name}
              </ToggleButton>
            </>
          ))}
      </div>
      {[1, 2, 3, 4, 5].map((day: number) => {
        return (
          <div className={moment().day(day).isSame(moment()) ? 'col bg-primary' : 'col'} key={`escala-days-${day}`}>
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
