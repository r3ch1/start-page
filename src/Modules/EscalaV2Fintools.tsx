import moment from 'moment';
import { useEffect, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const accessToken = localStorage.getItem('gAccessToken');

const EscalaV2Fintools = ({ fullContent = false }: { fullContent?: boolean }) => {
  const [users, setUsers] = useState([{ name: '', selected: false, index: 0, squad: '' }]);
  const [data, setData] = useState([]) as any[];
  const [dataFull, setDataFull] = useState([]) as any[];

  const getFromGoogleOrStorage = async (forceReload = false) => {
    try {
      let escalaFull = JSON.parse(localStorage.getItem('escalaFull') || '{}');
      if (!Object.keys(escalaFull).length) {
        const response = await axios.get(
          `https://content-sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ESCALA_SHEET_ID}/values/'escala%20RJ'!A1%3AZZ`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        escalaFull = response.data;
        localStorage.setItem('escalaFull', JSON.stringify(escalaFull));
      }
      return escalaFull;
    } catch (err) {
      console.error(err);
    }
  };

  const getNextPresencialDay = () => {
    return 'aaaaa';
  };

  const setChecked = (name: string) => {
    const selectedUser = users.find((user: any) => user.name === name);
    if (!selectedUser) {
      return false;
    }
    const index = users.indexOf(selectedUser);
    const _users = users.map((user: any) => {
      return { ...user, ...{ selected: false } };
    });
    _users[index].selected = !selectedUser.selected;
    setUsers(JSON.parse(JSON.stringify(_users)));
  };

  useEffect(() => {
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
            return {
              name: item,
              selected: item === process.env.REACT_APP_ESCALA_DEFAULT_USER ? true : false,
              index: i + 1,
              squad: range.values[1][i + 1],
            };
          })
          .sort((a: any, b: any) => a.name.localeCompare(b.name)),
      );
      setDataFull(range.values);
    };

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
  }, [users, dataFull]);

  const Simple = () => {
    return (
      <div className="row escala">
        <div className="col-12">
          {dataFull.length !== 0 &&
            users
              // .filter(
              //   (item: any) =>
              //     item.squad.toLocaleLowerCase() ===
              //     users
              //       .find((item: any) => item.name === process.env.REACT_APP_ESCALA_DEFAULT_USER)
              //       ?.squad.toLocaleLowerCase(),
              // )
              .map((user: any, i: number) => (
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
                    <i className={`fa-regular ${user.selected ? 'fa-square-check' : 'fa-square'}`} />
                    &nbsp;{user.name}
                  </ToggleButton>
                </>
              ))}
        </div>
        <div className="col-6">
          <FloatingLabel controlId="floatingInput" label="Last Day at" className="mb-3 mt-3">
            <Form.Control type="text" value={'aaaa'} disabled />
          </FloatingLabel>
        </div>
        <div className="col-6">
          <FloatingLabel controlId="floatingInput" label="Next Day at" className="mb-3 mt-3">
            <Form.Control type="text" value={'aaaa'} disabled />
          </FloatingLabel>
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
            // (item: any, i: number) =>
            //   i > 1 &&
            //   item.length &&
            //   (moment(data[0], 'D/M').format('w') === moment().format('w') ||
            //     moment().add(1, 'weeks').day(1).format('D/M') === item[0]),
          )
          .map((data: any, i: number) => {
            return (
              <div className="col" key={`escala-days-plus-${i}`}>
                {/* <p>
                  {moment(data[0], 'D/M').format('w')}
                  {moment().format('w')}
                </p> */}
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
      </div>
    );
  };

  const Full = () => {
    return <>FULL</>;
  };

  return fullContent ? Full() : Simple();
};
export default EscalaV2Fintools;
