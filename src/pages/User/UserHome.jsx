import React, { Component } from 'react';

import { Grid, GridCell } from 'rmwc/Grid';

import { SecurePage } from './../../components/Page';
import ParallaxBanner from './../../components/ParallaxBanner';

class UserHome extends Component {
  render() {
    return(
      <SecurePage title="User Home">
        <ParallaxBanner src="/static/images/343photo.JPG"/>
        <Grid tag="section">
          <GridCell span={12}>
            <h1>Welcome Back!</h1>
          </GridCell>
          <GridCell phone={12} tablet={12} desktop={6}>
            
          </GridCell>
          <GridCell phone={12} tablet={12} desktop={6}>
            
          </GridCell>
        </Grid>
      </SecurePage>
    );
  }
}

export default UserHome;
