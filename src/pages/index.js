import React from 'react';
import { Route } from 'react-router';
import TransitionSwitch from './../components/TransitionSwitch';

import Home from './Home.jsx';
import Auth from './Auth';
import User from './User';
import Error404 from './Error404.jsx';

export default (props) => 
  <TransitionSwitch transitionName="page" tag="main">
    <Route path="/auth" render={ Auth }/>
    <Route path="/user" render={ User }/>
    <Route exact path="/" component={ Home }/>
    <Route component={ Error404 }/>
  </TransitionSwitch>;