import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { SecurePage } from './../../../components/Page';
import Loading from './../../../components/Loading';

import Reservations, { Actions } from './../../../scripts/reservations.js';

class Confirm extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.getReservation(this.props.date));
  }
  
  render() {
    let { props } = this;
    if (props.state === Reservations.RES_LOADING || props.state === "NULL" || props.state === Reservations.RES_SUBMITTING) {
      return (
        <SecurePage title="Dave's Bistro - Reservation Confirmation">
          <div className="content">
            <h2>Reservation Confirmation</h2>
            <Loading size="l"/>
          </div>
        </SecurePage>
      );
      
    } else if (props.state === Reservations.RES_DNE || props.state === Reservations.RES_ERROR) {
      return (
        <SecurePage title="Dave's Bistro - Reservation Confirmation">
          <div className="content">
            <h2>Reservation Confirmation</h2>
            <div className="confirmation error">
              <p>It appears that there was a problem creating your reservation.</p>
            </div>
          </div>
        </SecurePage>
      );
      
    } else /*if (props.state === Reservations.RES_READY)*/ {
      const d = new Date(props.date);
      return (
        <SecurePage title="Dave's Bistro - Reservation Confirmation">
          <div className="content">
            <h2>Reservation Confirmation</h2>
            <div className="confirmation">
              <p><span className="label">Date: </span>{`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`}</p>
              <p><span className="label">Time: </span>{`${Math.floor(props.time / 60)}:${props.time % 60}`}</p>
              <p><span className="label">Location: </span>{props.location}</p>
              <p><span className="label">Number of Guests: </span>{props.party}</p>
            </div>
          </div>
        </SecurePage>
      );
    }
  }
}

export default withRouter(
  connect(
    (state, ownProps) => {
      let date = ownProps.location.state.date;
      if (state.reservations.reservations.includes(date)) {
        let res = state.reservations[date];
        return {
          state: res.state,
          date: date,
          time: res.time,
          location: res.location,
          party: res.party
        };
        
      } else {
        return {
          state: "NULL",
          date: date
        };
      }
    }
  )(Confirm)
);
