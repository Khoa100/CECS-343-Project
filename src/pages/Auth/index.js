import React from 'react';

import { Switch, Route } from 'react-router';

import SignIn from './SignIn.jsx';
import { IntroPage, AccountInfoPage, PersonalInfoPage, ContactInfoPage, SubmittingPage, VerificationPage, VerifyingPage } from './CreateAccount.jsx';
import './Auth.css';

const routes = (props) => (
  <Switch>
    <Route exact path="/auth/create/account" component={AccountInfoPage}/>
    <Route exact path="/auth/create/person" component={PersonalInfoPage}/>
    <Route exact path="/auth/create/contact" component={ContactInfoPage}/>
    <Route exact path="/auth/create/submit" component={SubmittingPage}/>
    <Route exact path="/auth/create/code" component={VerificationPage}/>
    <Route exact path="/auth/create/verify" component={VerifyingPage}/>
    <Route path="/auth/create" component={IntroPage}/>
    <Route path="/auth" component={SignIn}/>
  </Switch>
);

export default routes;
