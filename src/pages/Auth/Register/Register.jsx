import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import If from './../../../components/If';
import Loading from './../../../components/Loading';
import { UnsecurePage } from './../../../components/Page';

import { Actions } from './../../../scripts/createAccount';
import AWS, { Actions as AWSActions } from './../../../scripts/aws';

const emailRegex = /[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z]*)+/;
const phoneRegex = /(\+[1-9]{1})\s*-?\s*\(*\s*([0-9]{3})\s*\)?\s*-?\s*([0-9]{3})\s*-?\s*([0-9]{4})/;
const passRegexs = [
  /[a-z]/g,
  /[A-Z]/g,
  /[0-9]/g,
  /\W/g,
  /[a-zA-Z0-9\W]{8,}/
];

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      phoneError: false,
      emailError: false,
      passError: false
    };
    
    this.userChange = this.onChange.bind(this, Actions.userChange)
    this.passChange = this.onChange.bind(this, Actions.passChange);
    this.emailChange = this.onChange.bind(this, Actions.emailChange);
    this.firstChange = this.onChange.bind(this, Actions.firstChange);
    this.lastChange = this.onChange.bind(this, Actions.lastChange);
    this.phoneChange = this.onChange.bind(this, Actions.phoneChange);
    
    this.trySubmit = this.trySubmit.bind(this);
  }
  
  onChange(actionCreator, e) {
    this.props.dispatch(actionCreator(e.target.value));
  }
  
  trySubmit() {
    let email = this.props.email;
    let emailTest = emailRegex.exec(email);
    let emailError = false;
    if (emailTest) {
      email = emailTest[0];
    } else {
      emailError = true;
    }
    
    let phone = this.props.phone;
    let phoneTest = phoneRegex.exec(phone);
    let phoneError = false;
    if (phoneTest) {
      phone = "";
      for (let i = 1; i < phoneTest.length; i++) phone += phoneTest[i];
      
    } else {
      phoneError = true;
    }
    
    let pass = this.props.pass;
    let passError = false;
    for (let i = 0; i < passRegexs.length & !passError; i++) {
      if (passRegexs[i].exec(pass) === null) passError = true;
    }
    
    if (emailError | phoneError | passError) {
      this.setState({phoneError: phoneError, emailError: emailError, passError: passError});
      return;
    }
    
    this.props.dispatch(AWSActions.signup(this.props.user, this.props.pass, this.props.first, this.props.last, email, phone, 1, true));
  }
  
  render() {
    return(
      <UnsecurePage title="Dave's Bistro - Register">
        <div className="content">
          <If c={this.props.state === AWS.STATE_READY | this.props.state === AWS.STATE_SIGNUP_ERROR}>
            <div className="form-container">
              <div className="img-container">
                <img src="/static/images/logo/logo_square.png" alt="Dave's Bistro" className="logo"/>
              </div>
              <If c={this.props.state === AWS.STATE_SIGNUP_ERROR}>
                <div className="form-row error">
                  <p>There was a problem creating your account, check the log for details.</p>
                </div>
              </If>
              <div className="form-row">
                <label htmlFor="user">Username</label>
                <input type="text" name="user" placeholder="Username" value={this.props.user} onChange={this.userChange}/>
              </div>
              <div className="form-row">
                <label htmlFor="pass">Password</label>
                <input type="password" name="pass" placeholder="Password" value={this.props.pass} onChange={this.passChange}/>
              </div>
              <If c={this.state.passError}>
                <div className="form-row error">
                  <p>Password must contain upper and lower case letters, numbers, and symbols, and be at least 8 characters long</p>
                </div>
              </If>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email address" value={this.props.email} onChange={this.emailChange}/>
              </div>
              <If c={this.state.emailError}>
                <div className="form-row error">
                  <p>Invalid email adddress</p>
                </div>
              </If>
              <div className="form-row">
                <label htmlFor="first">First Name</label>
                <input type="text" name="first" placeholder="First name" value={this.props.first} onChange={this.firstChange}/>
              </div>
              <div className="form-row">
                <label htmlFor="last">Last Name</label>
                <input type="text" name="last" placeholder="Last name" value={this.props.last} onChange={this.lastChange}/>
              </div>
              <div className="form-row">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" placeholder="+1 XXX-XXX-XXXX" value={this.props.phone} onChange={this.phoneChange}/>
              </div>
              <If c={this.state.phoneError}>
                <div className="form-row error">
                  <p>Phone number must include country code.</p>
                </div>
              </If>
              <div className="form-row">
                <button onClick={this.trySubmit}>Create Account</button>
              </div>
            </div>
          </If>
          <If c={this.props.state === AWS.STATE_SIGNUP}>
            <Loading/>
          </If>
          <If c={this.props.state === AWS.STATE_SIGNUP_WAIT_CODE}>
            <Redirect to="/auth/verify"/>
          </If>
        </div>
      </UnsecurePage>
    );
  }
}

export default connect(
  (state) => {
    return {
      state: state.aws.state,
      user: state.createAccount.user,
      pass: state.createAccount.pass,
      email: state.createAccount.email,
      first: state.createAccount.first,
      last: state.createAccount.last,
      phone: state.createAccount.phone
    };
  }
)(Register);
