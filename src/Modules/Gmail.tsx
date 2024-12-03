import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { authorize, refresh, revoke } from 'react-native-app-auth';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Badge from 'react-bootstrap/Badge';
import Loading from '../Components/Loading';
import { Context as AuthContext } from '../context/AuthContext';

const config = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  redirectUrl: window.location.href, // Use the same redirect URI you configured in the Google Cloud Console
  scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
    tokenEndpoint: 'https://accounts.google.com/o/oauth2/token',
    revocationEndpoint: 'https://accounts.google.com/o/oauth2/revoke',
  },
};

const Gmail = ({ fullContent = false }: { fullContent?: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [forceReload, setForceReload] = useState(1);
  const { token }: any = useContext(AuthContext);

  const selectedAll = () => {
    setMessages(messages.map((item) => ({ ...item, selected: !item.selected })));
  };

  const deleteMessages = () => {
    console.log('DELETA');
  };

  const changeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const messageId = event.target.value;
    const selectedMsg = messages.find((item: any) => item.id === messageId);
    const index = messages.indexOf(selectedMsg);
    messages[index].selected = !selectedMsg.selected;
    setMessages(JSON.parse(JSON.stringify(messages)));
  };

  useEffect(() => {
    const getMessages = async () => {
      console.log('RECARREGA MSG');
      try {
        setMessages([]);
        setLoading(true);
        const apiUrl = 'https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=5';
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(headers);
        const _messages: any[] = [];
        const messagesSimple = await axios.get(apiUrl, { headers });
        for (const message of messagesSimple.data.messages) {
          const response = await axios.get(
            'https://www.googleapis.com/gmail/v1/users/me/messages/' + message.id + '?format=full',
            { headers },
          );
          _messages.push({ ...response.data, ...{ selected: false } });
        }

        setMessages(_messages);
      } catch (error: any) {
        console.log(error);
        setError('OAuth2 Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [forceReload, token]);
  return (
    <div className="row gmail">
      <div className="col-12">
        <div className="btn-group w-100">
          <button type="button" className="btn btn-primary" onClick={() => selectedAll()}>
            <i
              className={`${messages.filter((item: any) => item.selected).length === messages.length ? 'fa-solid fa-square-check' : 'fa-regular fa-square'}`}
            />
          </button>
          <button type="button" className="btn btn-primary">
            <i className="fa-solid fa-trash" onClick={() => deleteMessages()} />
          </button>

          <button type="button" className="btn btn-primary" onClick={() => setForceReload(forceReload + 1)}>
            <i className="fa-solid fa-rotate" />
          </button>
        </div>
      </div>
      <Loading isLoading={loading} style={{ marginTop: '10px' }} />
      {messages.length !== 0 && (
        <>
          <div className="col-12 mt-3">
            <ListGroup as="ol">
              {messages.map((message: any, i: number) => {
                const part = message.payload.parts.filter((part: any) => part.mimeType === 'text/html');
                // console.log(message.payload);
                const subject = message.payload.headers.find((item: any) => item.name === 'Subject');
                const receivedAt = message.payload.headers.find((item: any) => item.name === 'Date');
                return (
                  <ListGroup.Item as="li" className="text-left w-100" key={`list-email-${i}`}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">
                        <Form.Check // prettier-ignore
                          type={'checkbox'}
                          id={`checkbox-${i}`}
                          checked={message.selected}
                          onChange={(e) => changeCheck(e)}
                          label={<a href="#">{subject.value}</a>}
                          value={message.id}
                        />
                      </div>
                      <div style={{ paddingLeft: '24px' }}>{message.snippet}</div>
                    </div>
                    <div className="text-right">
                      <Badge bg="primary">{moment(receivedAt.value).fromNow()}</Badge>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default Gmail;
