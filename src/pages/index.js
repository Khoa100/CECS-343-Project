import React from 'react';
import { Route, Switch as TransitionSwitch } from 'react-router';
//import TransitionSwitch from './../components/TransitionSwitch';

import Home from './Home';
import About from './About';
import Menu from './Menu';
import Locations from './Locations';
import Auth from './Auth';
import User from './User';
import Error404 from './Error404.jsx';

export default (props) => 
  <TransitionSwitch transitionName="page" tag="main">
    <Route path="/about" component={About}/>
    <Route path="/menu" component={Menu}/>
    <Route path="/locations" component={Locations}/>
    <Route path="/auth" render={Auth}/>
    <Route path="/user" render={User}/>
    <Route exact path="/" component={Home}/>
    <Route component={Error404}/>
  </TransitionSwitch>;