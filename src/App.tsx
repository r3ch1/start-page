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

const App = () => {
  return (
    <div className="App container-fluid">
      <div className="container-fluid">
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
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <Card>
              <Card.Header style={{ textAlign: 'left' }}>Action</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Actions />
                </Card.Text>
              </Card.Body>
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default App;
