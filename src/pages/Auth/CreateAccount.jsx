import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { Card } from 'rmwc/Card';
import { Checkbox } from 'rmwc/Checkbox';
import { Button, ButtonIcon } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

import If from './../../components/If';
import Loading from './../../components/Loading';
import { UnsecurePage } from './../../components/Page';

import { Actions } from './../../scripts/createAccount';
import AWS, { Actions as AWSActions } from './../../scripts/aws';

const Wrap = (props) => {
  return(
    <UnsecurePage title="Create Account">
      <Grid tag="div">
        <GridCell phone={0} tablet={1} desktop={2}></GridCell>
        <GridCell phone={12} tablet={10} desktop={8}>
          <GridInner>
            <GridCell span={12}>
              {props.children}
            </GridCell>
            <GridCell span={6}>
              <If c={props.back || props.onBack}>
                <Link to={props.back}><Button onClick={props.onBack}><ButtonIcon>chevron_left</ButtonIcon>Back</Button></Link>
              </If>
            </GridCell>
            <GridCell span={6} style={{textAlign: "right"}}>
              <If c={props.next || props.onNext}>
                <Link to={props.next}><Button onClick={props.onNext}>Next<ButtonIcon>chevron_right</ButtonIcon></Button></Link>
              </If>
            </GridCell>
          </GridInner>
        </GridCell>
        <GridCell phone={0} tablet={1} desktop={2}></GridCell>
      </Grid>
    </UnsecurePage>
  );
};

const Intro = (props) => {
  return(
    <Wrap back="/auth" next="/auth/create/account" onBack={props.clear}>
      <h1>Create Account</h1>
      <p>
        There are many advantages to creating an account with Dave's Bistro.
        With a Dave's Bistro account, you can create and modify reservations
        online, choose seats for your reservation, and receive notifications
        about your reservations, as well as promotional content.
      </p>
      <p>
        To get started, we'll need to collect some basic information to create
        your account.
      </p>
    </Wrap>
  );
}
const IntroPage = connect(
  null,
  { clear: Actions.clear }
)(Intro);

const AccountInfo = (props) => {
  return(
    <Wrap back="/auth/create" next="/auth/create/person">
      <Card style={{width: "100%"}}>
        <div style={{padding: "1rem"}}>
          <h3>Basic Account Information</h3>
          <div>
            <TextField label="User Name" onChange={(e) => props.dispatch(Actions.userChange(e.target.value))} value={props.user}/>
          </div>
          <div>
            <TextField label="Password" type="password" onChange={(e) => props.dispatch(Actions.passChange(e.target.value))} value={props.pass}/>
          </div>
          {/* TODO: Verify password */}
        </div>
      </Card>
    </Wrap>
  );
}
const AccountInfoPage = connect(
  (state, ownProps) => {
    return {
      user: state.createAccount.user,
      pass: state.createAccount.pass
    };
  }
)(AccountInfo);

const PersonalInfo = (props) => {
  return(
    <Wrap back="/auth/create/account" next="/auth/create/contact">
      <Card style={{width: "100%"}}>
        <div style={{padding: "1rem"}}>
          <h3>Personal Information</h3>
          <div>
            <TextField label="First Name" onChange={(e) => props.dispatch(Actions.firstChange(e.target.value))} value={props.first}/>
          </div>
          <div>
            <TextField label="Last Name" onChange={(e) => props.dispatch(Actions.lastChange(e.target.value))} value={props.last}/>
          </div>
          <div>
            <Select label="Location" onChange={(e) => props.dispatch(Actions.locationChange(e.target.value))} value={props.location} options={{"1": "Los Angeles, CA", "2": "San Antonio, TX"}}/>
          </div>
        </div>
      </Card>
    </Wrap>
  );
}
const PersonalInfoPage = connect(
  (state, ownProps) => {
    return {
      first: state.createAccount.first,
      last: state.createAccount.last,
      location: state.createAccount.location
    };
  }
)(PersonalInfo);

const ContactInfo = (props) => {
  return(
    <Wrap back="/auth/create/person" next="/auth/create/submit" onNext={
        () => props.dispatch(
          AWSActions.signup(props.user, props.pass, props.first, props.last, props.email, props.phone, props.location, props.subscribe)
        )
      }>
      <Card style={{width: "100%"}}>
        <div style={{padding: "1rem"}}>
          <h3>Contact Information</h3>
          <div>
            <TextField label="Email" onChange={(e) => props.dispatch(Actions.emailChange(e.target.value))} value={props.email}/>
          </div>
          <div>
            <TextField label="Phone Number" onChange={(e) => props.dispatch(Actions.phoneChange(e.target.value))} value={props.phone}/>
          </div>
          <div>
            <Checkbox label="Subscribe for email updates and promotions" onChange={(e) => props.dispatch(Actions.subscribeChange(e.target.value))} value={props.subscribe}/>
          </div>
        </div>
      </Card>
    </Wrap>
  );
};
const ContactInfoPage = connect(
  (state) => {
    return {
      user: state.createAccount.user,
      pass: state.createAccount.pass,
      first: state.createAccount.first,
      last: state.createAccount.last,
      location: state.createAccount.location,
      email: state.createAccount.email,
      phone: state.createAccount.phone,
      subscribe: state.createAccount.subscribe
    };
  },
)(ContactInfo);

const Submitting = (props) => {
  if (props.state === AWS.STATE_SIGNUP) {
    return(
      <UnsecurePage title="Loading...">
        <Loading size="l"/>
      </UnsecurePage>
    );
  } else if (props.state === AWS.STATE_SIGNUP_WAIT_CODE) {
    return(
      <Redirect to="/auth/create/code"/>
    );
  } else {
    return (
      <UnsecurePage title="error">
        <p>Unexpected state:{props.state}</p>
      </UnsecurePage>
    );
  }
}
const SubmittingPage = connect(
  (state) => {
    return {
      state: state.aws.state
    };
  }
)(Submitting);

const VerificationCode = (props) => {
  return (
    <Wrap next="/auth/create/verify" onNext={props.dispatch(AWSActions.verifyCode(props.code, props.username))}>
      <Card style={{width: "100%"}}>
        <div style={{padding: "1rem"}}>
          <h3>Verification Code</h3>
          <If c={props.state === AWS.STATE_SIGNUP_CODE_ERROR}>
            <p>There was an error processing your verification code</p>
          </If>
          <div>
            <TextField label="Verification Code" onChange={(e) => props.dispatch(Actions.codeChange(e.target.value))} value={props.code}/>
          </div>
        </div>
      </Card>
    </Wrap>
  );
};
const VerificationCodePage = connect(
  (state) => {
    return {
      state: state.aws.state,
      username: state.createAccount.user,
      code: state.createAccount.code
    };
  }
)(VerificationCode);

const Verifying = (props) => {
  if (props.state === AWS.STATE_SIGNUP_VERIFY) {
    return (
      <UnsecurePage title="Verifying...">
        <h3>Checking verification code</h3>
        <Loading size="l"/>
      </UnsecurePage>
    );
    
  } else if (props.state === AWS.STATE_SIGNUP_CODE_ERROR) {
    return (
      <Redirect to="/auth/create/code"/>
    );
    
  } else if (props.state === AWS.STATE_AUTHING) {
    return (
      <UnsecurePage title="Signing in...">
        <h3>Signing in...</h3>
        <Loading size="l"/>
      </UnsecurePage>
    );
  } else {
    return (
      <UnsecurePage title="error">
        <p>Unexpected state:{props.state}</p>
      </UnsecurePage>
    );
  }
}
const VerifyingPage = connect(
  (state) => {
    return {
      state: state.aws.state
    };
  }
)(Verifying);

export { 
  IntroPage, AccountInfoPage,
  PersonalInfoPage, ContactInfoPage,
  SubmittingPage, VerificationCodePage as VerificationPage,
  VerifyingPage
};
