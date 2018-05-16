import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import If from './../../../components/If';
import { UnsecurePage } from './../../../components/Page';

import AWS, { Actions } from './../../../scripts/aws';

class Auth extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      'field-user': "",
      'field-pass': ""
    };
    
    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.trySignin = this.trySignin.bind(this);
  }
  
  userChange(e) {
    this.setState({
      'field-user': e.target.value
    });
  }
  
  passChange(e) {
    this.setState({
      'field-pass': e.target.value
    });
  }
  
  keyPress(e) {
    if (e.key === "Enter") {
      this.trySignin();
    }
  }
  
  trySignin() {
    if (this.state['field-user'].trim().length === 0) alert("Username is required");
    if (this.state['field-pass'].trim().length === 0) alert("Password is required");
    this.props.dispatch(Actions.signin(this.state['field-user'], this.state['field-pass']));
  }
  
  render() {
    return(
      <UnsecurePage title="Dave's Bistro - Login">
        <div className="content">
          <div className="form-container">
            <div className="img-container">
              <img src="/static/images/logo/logo_square.png" alt="Dave's Bistro" className="logo"/>
            </div>
            <div className="form-row">
              <label htmlFor="user">Username</label>
              <input type="text" name="user" placeholder="Enter username" value={this.state['field-user']} onChange={this.userChange} onKeyPress={this.keyPress}/>
            </div>
            <div className="form-row">
              <label htmlFor="pass">Pasword</label>
              <input type="password" name="pass" placeholder="Enter password" value={this.state['field-pass']} onChange={this.passChange} onKeyPress={this.keyPress}/>
            </div>
            <If c={this.props.failed}>
              <div className="form-row error">
                <p>Username or password incorrect</p>
              </div>
            </If>
            <div className="form-row">
              <button onClick={this.trySignin}>Login</button>
            </div>
            <div className="form-row">
              <Link className="register" to="/auth/register">Register</Link>
              <Link className="reset" to="/auth/reset">Reset Password</Link>
            </div>
          </div>
        </div>
      </UnsecurePage>
    );
  }
}

export default connect(
  (state) => {
    return {
      failed: state.aws.state === AWS.STATE_AUTH_FAILED,
      state: state.aws.state
    };
  }
)(Auth);
