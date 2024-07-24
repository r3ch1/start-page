import moment from 'moment';
import { Button } from 'react-bootstrap';

import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
const Actions = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const setStart = async () => {};
  const setLunchInterval = async () => {
    const body = new FormData();
    body.append('token', `${process.env.REACT_APP_SLACK_TOKEN}`);
    body.append(
      'profile',
      '{email:"hericbranco@gmail.com", "status_text": "Almoçando", "status_emoji":":knife_fork_plate:","status_expiration": ' +
        moment().add(1, 'hour').unix() +
        '}',
    );
    await fetch('https://slack.com/api/users.profile.set', { method: 'POST', body })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...{
          scroll: true,
          backdrop: false,
          placement: 'end',
          className: 'more-info',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
          etc.
        </Offcanvas.Body>
      </Offcanvas>
      <div className="row">
        <div className="col">
          <div className="btn-group w-100">
            <button type="button" className="btn btn-primary" onClick={() => setStart()}>
              <i className="fa-solid fa-sun" />
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setLunchInterval()}>
              <i className="fa-solid fa-utensils" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fa-solid fa-coffee" />
            </button>
            <button type="button" className="btn btn-primary">
              <span className="fa-stack">
                <i className="fa-solid fa-utensils fa-stack-1x" />
                <i className="fa-solid fa-ban fa-stack-2x" style={{ color: 'tomato' }} />
              </span>
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setStart()}>
              <i className="fa-solid fa-moon" />
            </button>
          </div>
        </div>
        <Button variant="primary" onClick={toggleShow} className="mt-2" size="sm">
          <i className="fa-solid fa-ellipsis"></i>
        </Button>
      </div>
    </>
  );
};
export default Actions;
