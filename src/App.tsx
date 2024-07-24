import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Wheather from './Modules/Weather';
import Links from './Modules/Links';
import Actions from './Modules/Actions';
import EscalaFintools from './Modules/EscalaFintools';
import ZombicideCompanion from './Modules/ZombicideCompanion';
import OffcanvasPrincipal from './Modules/OffcanvasPrincipal';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  const [theme, setTheme] = useState('');
  const [bodyCanva, setBodyCanva] = useState('');
  const [showCanva, setShowCanva] = useState(false);
  const toogleCanva = (compBody: string) => {
    setBodyCanva(compBody);
    setShowCanva(!showCanva);
  };

  const getTheme = () => {
    const themeStr = localStorage.getItem('theme');
    if (!themeStr) return 'light';
    return themeStr;
  };

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem('theme', theme);
    document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', getTheme());
    setTheme(getTheme());
  }, []);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand>
            <i className="fa-solid fa-home" />
            &nbsp;Start Page
          </Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <div className="actions ml-auto">
              <button className="btn" onClick={() => setTheme(getTheme() === 'light' ? 'dark' : 'light')}>
                <i className={`fa-regular ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`} />
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App container-fluid">
        <OffcanvasPrincipal isOpen={showCanva} toogle={() => toogleCanva('')} body={bodyCanva} />
        <div className="row justify-content-center">
          <div className="col-md-4 col-xs-12">
            <form action="https://duckduckgo.com/" method="get" className="form-search">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <img
                    loading="lazy"
                    alt=""
                    src="https://f.start.me/duckduckgo.com"
                    width="16px"
                    height="16px"
                    className="search__logo-icon"
                  />
                </InputGroup.Text>
                <Form.Control autoFocus name="q" placeholder="DuckDuckGo" />
                <Button>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </form>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-xs-12 col-md-4">
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>
                <i className="fa-brands fa-slack" />
                &nbsp;Slack Action
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Actions />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>
                <i className="fa-solid fa-dice"></i>
                &nbsp;Zombicide Companion
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ZombicideCompanion />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={() => toogleCanva('zombicide')} className="mt-2" size="sm">
                  <i className="fa-solid fa-ellipsis"></i>
                </Button>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>News</Card.Header>
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-md-4">
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>Links</Card.Header>
              <Card.Body className="links">
                <Links />
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-md-4">
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>Clima</Card.Header>
              <Card.Body>
                <Wheather />
              </Card.Body>
            </Card>
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>Escala</Card.Header>
              <Card.Body>
                <EscalaFintools />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
