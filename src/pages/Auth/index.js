import React from 'react';

import { Switch, Route } from 'react-router';

import Auth from './Auth/';
import Register from './Register';
import Verify from './Verify';

const routes = (props) => (
  <Switch>
    <Route path="/auth/register" component={Register}/>
    <Route path="/auth/verify" component={Verify}/>
    <Route path="/auth" component={Auth}/>
  </Switch>
);

export default routes;
