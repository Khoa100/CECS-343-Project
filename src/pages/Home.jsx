import React, { Component } from 'react';

import { Grid, GridCell } from 'rmwc/Grid';
import Page from './../components/Page';

class Home extends Component {
  render() {
    return(
      <Page title="Dave's Bistro">
        <Grid tag="main">
          <GridCell desktop={4} tablet={6} phone={12}><h1>Welcome to Dave's Bistro!</h1></GridCell>
        </Grid>
      </Page>
    );
  }
}

export default Home;
