import { Component } from 'react';

import default, * as Header from './../components/Header';

class AuthHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Header>
        <Header.Link to="/user" title="Home">Home</Header.Link>
        <Header.Link to="/user/create-reservation" title="Create new reservation">Create Reservation</Header.Link>
        <Header.Link to="/user/future-reservations" title="View future reservations">Future Reservations</Header.Link>
        <Header.Link to="/user/past-reservations" title="View Past reservations">Past Reservations</Header.Link>
        <Header.Link to="/user/prefs" title="Preferences">Preferences</Header.Link>
        <Header.Button title="Sign Out" onClick={}>Sign Out</Header.Button>
      </Header>
    );
  }
}

export default AuthHeader;