import React, { Component } from 'react';

import Page from './../components/Page';

class Error404 extends Component {
  render() {
    return(
      <Page title="Page Not Found - Error 404">
        <h1>Uh-oh!</h1>
        <p>It appears that you were directed to a page that doesn't exist!</p>
      </Page>
    );
  }
}

export default Error404;
