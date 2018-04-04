import { Component } from 'react';

import default, * as Header from './../components/Header';

class UnAuthHeader extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Header>
        <Header.Link to="/" title="Home">Home</Header.Link>
        <Header.Link to="/#about" title="About">About</Header.Link>
        <Header.Link to="/#reviews" title="Reviews">Reviews</Header.Link>
        <Header.Link to="/signin" title="Sign In">Sign In</Header.Link>
      </Header>
    );
  }
}

export default UnAuthHeader;