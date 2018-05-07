import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { Card, CardMedia, CardActions, CardActionButtons, CardAction } from 'rmwc/Card';
import { Button } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';

import { UnsecurePage } from './../../components/Page';

import { Actions as AWS } from './../../scripts/aws';

class SignIn extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      "field-user": "",
      "field-password": ""
    };
    
    this.userChange = this.fieldChange.bind(this, 'user');
    this.passwordChange = this.fieldChange.bind(this, 'password');
    this.trySignIn = this.trySignIn.bind(this);
  }
  
  fieldChange(field, e) {
    this.setState({ [`field-${field}`]: e.target.value });
  }
  
  trySignIn(e) {
    this.props.dispatch(AWS.signin(this.state["field-user"], this.state["field-password"]));
    this.setState({
      "field-user": "",
      "field-password": ""
    });
  }
  
  render() {
    return(
      <UnsecurePage title="Sign In">
        <Grid tag="main">
          <GridCell phone={0} tablet={2} desktop={3}></GridCell>
          <GridCell phone={12} tablet={8} desktop={6}>
            <GridInner>
              <GridCell span={12}>
                <Card>
                  <CardMedia square style={{backgroundImage: "url(/static/images/logo/logo_square.png)"}}/>
                  <div style={{padding: "1rem"}}>
                    <h1>Sign In</h1>
                    <div>
                      <TextField label="Username" fullwidth onChange={this.userChange} value={this.state['field-user']}/>
                    </div>
                    <div>
                      <TextField label="Password" fullwidth type="password" onChange={this.passwordChange} value={this.state['field-password']}/>
                    </div>
                  </div>
                  <CardActions>
                    <CardActionButtons>
                      <CardAction onClick={this.trySignIn}>Sign In</CardAction>
                    </CardActionButtons>
                  </CardActions>
                </Card>
              </GridCell>
              <GridCell span={6}>
                <Link to="/auth/create"><Button>Create Account</Button></Link>
              </GridCell>
              <GridCell span={6} style={{textAlign: "right"}}>
                <Link to="/auth/forgot"><Button>Forgot Password</Button></Link>
              </GridCell>
            </GridInner>
          </GridCell>
          <GridCell phone={0} tablet={2} desktop={3}></GridCell>
        </Grid>
      </UnsecurePage>
    );
  }
}

export default connect()(SignIn);
