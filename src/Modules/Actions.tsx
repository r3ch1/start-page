import moment from 'moment';
import { Button } from 'react-bootstrap';

const Actions = () => {
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
    <div className="row">
      <Button onClick={() => setStart()}>
        <i className="fa-regular fa-sun" />
      </Button>
      <Button onClick={() => setLunchInterval()}>
        <i className="fa-solid fa-utensils" />
      </Button>
    </div>
  );
};
export default Actions;
