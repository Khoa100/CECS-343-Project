import React, { Component } from 'react';

import { SecurePage } from './../../components/Page';

class UserHome extends Component {
  render() {
    return(
      <SecurePage title="User Home">
        <div className="content">
          <img src= "/static/images/locations/davesbistro_texas.jpg" alt= "dave's bistro" width="100%" height="93%"/>
        </div>
      </SecurePage>
    );
  }
}

export default UserHome;
