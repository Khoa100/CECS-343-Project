import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import If from './../../../components/If';
import Dispatch from './../../../components/Dispatch';
import Loading from './../../../components/Loading';
import { UnsecurePage } from './../../../components/Page';

import AWS, { Actions } from './../../../scripts/aws';

class Verify extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      code: "",
      user: props.user
    };
    
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  onCodeChange(e) {
    this.setState({code: e.target.value});
  }
  
  onUserChange(e) {
    this.setState({user: e.target.value});
  }
  
  onKeyPress(e) {
    if (e.key === "Enter") {
      this.submit();
    }
  }
  
  submit() {
    this.props.dispatch(Actions.verifyCode(this.state.code, this.state.user));
  }
  
  render() {
    return(
      <UnsecurePage title="Dave's Bistro - verify">
        <div className="content">
          <If c={this.props.state === AWS.STATE_SIGNUP_WAIT_CODE || this.props.state === AWS.STATE_SIGNUP_CODE_ERROR}>
            <div className="form-container">
              <div className="img-container">
                <img src="/static/images/logo/logo_square.png" alt="Dave's Bistro" className="logo"/>
              </div>
              <div className="form-row">
                <p>
                  You will receive an email with a verification code.
                </p>
                <p>
                  Enter the code below.
                </p>
              </div>
              <div className="form-row">
                <label htmlFor="user">Username</label>
                <input type="text" placeholder="Username" value={this.state.user} onChange={this.onUserChange} onKeyPress={this.onKeyPress}/>
              </div>
              <div className="form-row">
                <label htmlFor="code">Verification Code</label>
                <input type="text" placeholder="Verification Code" value={this.state.code} onChange={this.onCodeChange} onKeyPress={this.onKeyPress}/>
              </div>
              <If c={this.props.state === AWS.STATE_SIGNUP_CODE_ERROR}>
                <div className="form-row error">
                  <p>Incorrect code</p>
                </div>
              </If>
              <div className="form-row">
                <button onClick={this.submit}>Submit</button>
              </div>
            </div>
          </If>
          <If c={this.props.state === AWS.STATE_SIGNUP_VERIFY}>
            <Loading/>
          </If>
          <If c={this.props.state === AWS.STATE_READY}>
            <If c={this.props.pass.length >= 8}>
              <Dispatch action={Actions.signin(this.state.user, this.props.pass)}/>
            </If>
            <If c={this.props.pass.length < 8}>
              <Redirect to="/auth"/>
            </If>
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
      pass: state.createAccount.pass
    };
  }
)(Verify);
