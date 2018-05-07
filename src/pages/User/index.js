import React from 'react';
import { Switch, Route } from 'react-router';

import UserHome from './UserHome';
import Create from './CreateReservation';

const routes = (props) => {
  return(
    <Switch>
      <Route path="/user/create" render={ Create }/>
      <Route path="/user/" component={ UserHome }/>
    </Switch>
  );
};

export default routes;
