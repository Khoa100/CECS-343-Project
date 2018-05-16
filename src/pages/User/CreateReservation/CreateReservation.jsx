import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { SecurePage } from './../../../components/Page';
import If from './../../../components/If';
import ReservationEditor from './../../../components/ReservationEditor';

import Reservations, { Actions } from './../../../scripts/reservations';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

class CreateReservation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      submitted: false,
      date: 0
    };
    
    this.onSubmitted = this.onSubmitted.bind(this);
  }
  
  onSubmitted(date) {
    this.setState({
      submitted: true,
      date: date
    });
  }
  
  render() {
    return(
      <SecurePage title="Dave's Bistro - Create Reservation">
        <div className="content">
          <h1 align="center">New Reservation</h1>
          <ReservationEditor
            date={today}
            time={18 * 60}
            location="Los Angeles"
            party={4}
            create
            submitted={this.onSubmitted}/>
          <If c={this.state.submitted}>
            <Redirect to={{pathname:"/user/confirm", state:{date:this.state.date}}}/>
          </If>
        </div>
      </SecurePage>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      state: state.reservations.state
    };
  }
)(CreateReservation);
