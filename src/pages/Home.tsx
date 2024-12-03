import Card from 'react-bootstrap/Card';

import { Navbar, SearchBar } from '../components';
import { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const Home = () => {
  const { boxes }: any = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="App container-fluid">
        {/* <OffcanvasPrincipal isOpen={showCanva} toogle={() => toogleCanva('')} body={bodyCanva} /> */}
        <SearchBar />
        <div className="row justify-content-center">
          <div className="col-md-4 col-xs-12">
            {boxes
              .filter((i: any) => i.active === true && i.col === 'left')
              .map((i: any) => (
                <Card>
                  <Card.Header style={{ textAlign: 'left' }}>{i.name}</Card.Header>
                  <Card.Body>{i.component}</Card.Body>
                </Card>
              ))}
          </div>
          <div className="col-md-4 col-xs-12">
            {boxes
              .filter((i: any) => i.active === true && i.col === 'center')
              .map((i: any) => (
                <Card>
                  <Card.Header style={{ textAlign: 'left' }}>{i.name}</Card.Header>
                  <Card.Body>{i.component}</Card.Body>
                </Card>
              ))}
          </div>
          <div className="col-md-4 col-xs-12">
            {boxes
              .filter((i: any) => i.active === true && i.col === 'right')
              .map((i: any) => (
                <Card>
                  <Card.Header style={{ textAlign: 'left' }}>{i.name}</Card.Header>
                  <Card.Body>{i.component}</Card.Body>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
