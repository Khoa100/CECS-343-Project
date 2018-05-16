import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import If from './../../../components/If';
import { SecurePage } from './../../../components/Page';
import ReservationEditor from './../../../components/ReservationEditor';

class Edit extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      submitted: false,
      date: 0
    };
    
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(date) {
    this.setState({
      submitted: true,
      date: date
    });
  }
  
  render() {
    return (
      <SecurePage title="Dave's Bistro - Edit Reservation">
        <div className="content">
          <h2>Edit Reservation</h2>
          <ReservationEditor
            date={new Date(this.props.date)}
            time={this.props.time}
            location={this.props.location}
            party={this.props.party}
            submitted={this.onSubmit}
            />
          <If c={this.state.submitted}>
            <Redirect to={{pathname:"/user/confirm", state:{date:this.state.date}}}/>
          </If>
        </div>
      </SecurePage>
    );
  }
}

export default withRouter(
  connect(
    (state, ownProps) => {
      let d = ownProps.location.state.date;
      return {
        date: d,
        time: state.reservations[d].time,
        location: state.reservations[d].location,
        party: state.reservations[d].party
      };
    }
  )(Edit)
);
