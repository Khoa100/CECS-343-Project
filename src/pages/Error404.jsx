import { Component } from 'react';

import Page from './../fragments/Page.jsx';

class Error404 extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return(
      <Page title="Page Not Found - Error 404">
        <h1>Uh-oh!</h1>
        <p>It appears that you were directed to a page that doesn't exist!</p>
      </Page>
    );
  }
}