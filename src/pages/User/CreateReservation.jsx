import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Card } from 'rmwc/Card';
import { Button, ButtonIcon } from 'rmwc/Button';
import { FormField } from 'rmwc/FormField';
import { Grid, GridCell, GridInner } from 'rmwc/Grid';
import { Select } from 'rmwc/Select';

import { SecurePage } from './../../components/Page';
import Loading from './../../components/Loading';
import If from './../../components/If';

import { Actions } from './../../scripts/tempReservation';

const Wrap = (props) => {
  return(
    <SecurePage title={props.title}>
      <Grid tag="section">
        <GridCell phone={0} tablet={1} desktop={2}></GridCell>
        <GridCell phone={12} tablet={10} desktop={8}>
          <GridInner>
            <GridCell span={12}>{props.children}</GridCell>
            <GridCell span={6}>
              <If c={props.back}>
                <Link to={props.back}><Button onClick={props.onBack}><ButtonIcon>chevron_left</ButtonIcon>Cancel</Button></Link>
              </If>
            </GridCell>
            <GridCell span={6} style={{textAlign: "right"}}>
              <If c={props.next}>
                <Link to={props.next}><Button onClick={props.onNext}>Next<ButtonIcon>chevron_right</ButtonIcon></Button></Link>
              </If>
            </GridCell>
          </GridInner>
        </GridCell>
        <GridCell phone={0} tablet={1} desktop={2}></GridCell>
      </Grid>
    </SecurePage>
  );
};

const Info = (props) => {
  return(
    <Wrap 
      title="New Reservation"
      back="/user"
      next="/user/create/submit"
      onNext={() => props.dispatch(Actions.trySubmit(props.location, props.date, props.time, props.count))}>
      <Card style={{width: "100%"}}>
        <div style={{padding: "1rem"}}>
          <h1>New Reservation</h1>
          <GridInner>
            <GridCell phone={12} tablet={12} desktop={6}>
              <Select
                label="Reservation Location"
                value={props.location}
                onChange={(e) => props.dispatch(Actions.locationChange(e.target.value))}
                options={{"1": "Los Angeles, CA", "2": "San Antonio, TX"}}/>
              <label>Reservation Location</label>
            </GridCell>
            <GridCell phone={12} tablet={12} desktop={6}>
              <FormField>
                <input
                  type="number"
                  id="inpt-res-count"
                  value={props.count}
                  onChange={(e) => props.dispatch(Actions.guestCountChange(e.target.value))}
                  />
                <label htmlFor="inpt-res-count">Number of Guests</label>
              </FormField>
            </GridCell>
            <GridCell phone={12} tablet={12} desktop={6}>
              <FormField>
                <input
                  type="date"
                  id="inpt-res-date"
                  value={props.date}
                  onChange={(e) => props.dispatch(Actions.dateChange(e.target.value))}/>
                <label htmlFor="inpt-res-date">Reservation Date</label>
              </FormField>
            </GridCell>
            <GridCell phone={12} tablet={12} desktop={6}>
              <FormField>
                <input
                  type="time"
                  id="inpt-res-time"
                  value={props.time}
                  onChange={(e) => props.dispatch(Actions.timeChange(e.target.value))}/>
                <label htmlFor="inpt-res-time">Reservation Time</label>
              </FormField>
            </GridCell>
          </GridInner>
        </div>
      </Card>
    </Wrap>
  );
};
const InfoPage = connect(
  (state) => {
    return {
      location: state.tempReservation.location,
      date: state.tempReservation.date,
      time: state.tempReservation.time,
      count: state.tempReservation.count
    };
  }
)(Info);

const Processing = (props) => {
  if (props.confirmed) {
    return(
      <Redirect to="/user/create/confirm"/>
    );
  } else {
    return(
      <SecurePage title="Submitting Reservation">
        <Grid tag="section">
          <GridCell phone={0} tablet={1} desktop={2}></GridCell>
          <GridCell phone={12} tablet={10} desktop={8}>
            <Loading/>
          </GridCell>
          <GridCell phone={0} tablet={1} desktop={2}></GridCell>
        </Grid>
      </SecurePage>
    );
  }
};
const Submitting = connect()(Processing);

const Confirmed = (props) => {
  return(
    <SecurePage title="Reservation Confirmed">
      <GridCell phone={0} tablet={1} desktop={2}></GridCell>
      <GridCell phone={12} tablet={10} desktop={8}>
        
      </GridCell>
      <GridCell phone={0} tablet={1} desktop={2}></GridCell>
    </SecurePage>
  );
};

const routes = (props) => {
  return(
    <Switch>
      <Route path="/user/create/confirm" render={Confirmed}/>
      <Route path="/user/create/submit" component={Submitting}/>
      <Route path="/user/create" component={InfoPage}/>
    </Switch>
  );
};

export default routes;
