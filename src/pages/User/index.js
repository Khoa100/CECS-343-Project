import React from 'react';
import { Switch, Route } from 'react-router';

import UserHome from './UserHome';
import CreateReservation from './CreateReservation';
import ConfirmReservation from './Confirm';
import ListReservations from './ListReservations';
import Edit from './Edit';

const routes = (props) => {
  return(
    <Switch>
      <Route path="/user/newres" component={ CreateReservation }/>
      <Route path="/user/confirm" component={ ConfirmReservation }/>
      <Route path="/user/viewres" component={ ListReservations }/>
      <Route path="/user/edit" component={ Edit }/>
      <Route path="/user/" component={ UserHome }/>
    </Switch>
  );
};

export default routes;
