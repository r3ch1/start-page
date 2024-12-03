import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const SearchBar = () => {
  return (
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
              <i className="fa-solid fa-search" />
            </Button>
          </InputGroup>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
