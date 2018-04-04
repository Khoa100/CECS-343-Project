import { Component } from 'react';
import { Switch, Route } from 'react-router';

import * as Pages from './pages';

const Routes = (props) => (
  <Switch>
    <Route path="/" component={ Pages.Home }/>
    <Route component={ Pages.Error404 }/>
  </Switch>
);