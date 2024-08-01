import moment from 'moment';
import { useEffect, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';

const EscalaV2Fintools = () => {
  const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  const [users, setUsers] = useState([{ name: '', selected: false, index: 0 }]);
  const [data, setData] = useState([]) as any[];
  const [dataFull, setDataFull] = useState([]) as any[];

  const getFromGoogleOrStorage = async (forceReload = false) => {
    try {
      let escalaFull = JSON.parse(localStorage.getItem('escalaFull') || '{}');
      if (!Object.keys(escalaFull).length) {
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: process.env.REACT_APP_ESCALA_SHEET_ID,
          range: "'escala RJ'!A1:ZZ",
        });
        escalaFull = response.result;
        localStorage.setItem('escalaFull', JSON.stringify(escalaFull));
      }
      return escalaFull;
    } catch (err) {
      console.error(err);
    }
  };

  const getDados = async () => {
    const range = await getFromGoogleOrStorage();
    if (!range || !range.values || range.values.length === 0) {
      console.log('sem dados');
      return;
    }
    setUsers(
      range.values[0]
        .filter((item: any) => item.trim() !== '' && item !== 'Total do dia')
        .map((item: any, i: number) => {
          return { name: item, selected: false, index: i + 1 };
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

    if (window.gapi.client.getToken() === null) {
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
      return { name: user.name, selected: false, index: user.index };
    });
    _users[index].selected = !selectedUser.selected;
    setUsers(JSON.parse(JSON.stringify(_users)));
  };

  useEffect(() => {
    const initializeGapiClient = async () => {
      await window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    };
    console.log('CARREGA');
    window.gapi.load('client', initializeGapiClient);
    getDados();
  }, []);

  useEffect(() => {
    const selectedUser = users.find((user: any) => user.selected);
    if (!dataFull.length || !selectedUser) return;
    const userIndex = dataFull[0].indexOf(selectedUser.name);
    const presencialInWeek: any[] = [];
    dataFull.forEach((item: any) => {
      if (item.length > userIndex && item.length > 1 && item[userIndex].toLocaleLowerCase() === 'x') {
        presencialInWeek.push({
          date: moment(item[0], 'D/M').format('YYYY-MM-DD'),
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
                {user.name}[{user.index}]
              </ToggleButton>
            </>
          ))}
      </div>
      {[1, 2, 3, 4, 5].map((day: number) => {
        return (
          <div className={moment().day(day).isSame(moment()) ? 'col bg-primary' : 'col'} key={`escala-days-${day}`}>
            <p>{moment().day(day).format('DD/MM')}</p>
            <p>{moment().day(day).format('ddd')}</p>
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
      {dataFull
        .filter(
          (item: any, i: number) => i > 1 && item.length && moment().add(1, 'weeks').day(1).format('D/M') === item[0],
        )
        .map((data: any, i: number) => {
          return (
            <div className="col" key={`escala-days-${i}`}>
              <p>{data[0]}</p>
              <p>{moment(data[0], 'D/M').format('ddd')}</p>
              <p>
                {data[users.find((item: any) => item.selected)?.index || 0].toLocaleLowerCase() === 'x'
                  ? 'OFFICE'
                  : 'HOME'}
              </p>
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
