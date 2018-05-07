import React, { Component } from 'react';

import { Grid, GridCell } from 'rmwc/Grid';

import Page from './../components/Page';
import ParallaxBanner from './../components/ParallaxBanner';

class Home extends Component {
  render() {
    return(
      <Page title="Dave's Bistro">
        <ParallaxBanner src="/static/images/343photo.JPG" id="top"/>
        <Grid tag="section">
          <GridCell desktop={12} tablet={12} phone={12}><h1>Welcome to Dave's Bistro!</h1></GridCell>
        </Grid>
        <Grid tag="section">
          <GridCell span={12}>
            <h2 id="about">About Dave's Bistro</h2>
          </GridCell>
        </Grid>
        <Grid tag="section">
          <GridCell span={12}>
            <h2 id="reviews">Reviews</h2>
          </GridCell>
        </Grid>
      </Page>
    );
  }
}

export default Home;
