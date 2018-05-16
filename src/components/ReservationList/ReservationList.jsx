import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import If from './../If';
import Loading from './../Loading';

import Reservations, { Actions } from './../../scripts/reservations.js';

class ReservationPreview extends Component {
  componentDidMount() {
    if (this.props.state === "NULL") {
      this.props.dispatch(Actions.getReservation(this.props.date));
    }
  }
  
  render() {
    if (this.props.state === Reservations.RES_LOADING) {
      return (
        <tr className="reservation-preview">
          <Loading size="s"/>
        </tr>
      );
    } else if (this.props.state === Reservations.RES_READY) {
      const d = new Date(this.props.date);
      const t = new Date(this.props.time);
      return (
        <tr className="reservation-preview">
          <td>{`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`}</td>
          <td>{this.props.location}</td>
          <td>{`${t.getHours()}:${t.getMinutes()}`}</td>
          <td>{this.props.party}</td>
          <td><Link to={{ pathname:"/user/edit", state:{date: this.props.date}}}>edit</Link></td>
        </tr>
      );
      
    } else {
      return (
        <tr><p>There was a problem loading the reservation <code>{this.props.state}</code></p></tr>
      );
    }
  }
}

const ReservationPreviewComponent = connect(
  (state, ownProps) => {
    if (state.reservations.reservations.includes(ownProps.date)) {
      let res = state.reservations[ownProps.date];
      return {
        state: res.state,
        date: ownProps.date,
        location: res.location,
        time: res.time,
        party: res.party
      };
      
    } else {
      return {
        state: "NULL"
      };
    }
  }
)(ReservationPreview);

class ReservationList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      start: props.state,
      res: props.reservations.map((e) => { return (<ReservationPreviewComponent key={e} date={e}/>); })
    };
  }
  
  static getDerivedStateFromProps(newProps, oldState) {
    if (newProps.start != oldState.start) newProps.dispatch(Actions.listReservations(newProps.start, newProps.end));
    
    return {
      res: newProps.reservations.map((e) => { return (<ReservationPreviewComponent key={e} date={e}/>); }),
      start: newProps.start
    };
  }
  
  componentDidMount() {
    this.props.dispatch(Actions.listReservations(this.props.start, this.props.end));
  }
  
  render() {
    if (this.props.state === Reservations.STATE_POLLING) {
      return (
        <div className="reservation-list">
          <Loading size="m"/>
        </div>
      );
      
    } else if (this.props.state === Reservations.STATE_POLL_ERROR) {
      return (
        <div className="reservation-list error">
          <p>There was a problem loading reservations</p>
        </div>
      );
      
    } else {
      return (
        <div className="reservation-list">
          <table>
            <tbody className="heading">
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Time</th>
                <th>Guests</th>
                <th></th>
              </tr>
            </tbody>
            <tbody className="content">
              {this.state.res}
            </tbody>
            <If c={this.state.res.length === 0}>
              <p>
                No reservations for this month.
              </p>
            </If>
          </table>
        </div>
      );
    }
  }
}

export default connect(
  (state, ownProps) => {
    return {
      state: state.reservations.state,
      reservations: state.reservations.reservations.filter((e) => {
        return (e > ownProps.start) && (e < ownProps.end);
      })
    };
  }
)(ReservationList);
