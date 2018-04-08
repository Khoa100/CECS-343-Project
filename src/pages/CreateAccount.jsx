import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField, TextFieldHelperText } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

import { If, Secure, Page } from './../components';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }
  
  render() {
    return(
      <Page title="Create Account"></Page>
    );
  }
}