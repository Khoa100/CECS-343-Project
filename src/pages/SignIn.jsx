import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldHelperText } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

import { UnsecurePage } from './../components/Page';

class SignIn extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ["field-user"]: "",
      ["field-password"]: ""
    };
    
    this.userChange = this.fieldChange.bind(this, 'user');
    this.passwordChange = this.fieldChange.bind(this, 'password')
  }
  
  fieldChange(field, e) {
    this.setState({ [`field-${field}`]: e.target.value });
  }
  
  render() {
    return(
      <UnsecurePage title="Sign In">
        <Grid tag="main">
          <GridCell phone={12} tablet={12} desktop={12}>
            {/* Banner image */}
          </GridCell>
          <GridCell phone={12} tablet={12} desktop={6}>
            <GridInner>
              <GridCell phone={12} table={12} desktop={12} align='bottom'>
                <TextField label="Username" fullwidth onChange={this.userChange} value={this.state['field-user']}/>
              </GridCell>
              <GridCell phone={12} table={12} desktop={12}>
                <TextField label="Password" fullwidth type="password" onChange={this.passwordChange} value={this.state['field-password']}/>
              </GridCell>
            </GridInner>
          </GridCell>
          <GridCell phone={12} tablet={12} desktop={6}>
            
          </GridCell>
        </Grid>
      </UnsecurePage>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps
};

export default connect(mapStateToProps)(SignIn);
