import React, { Component } from 'react';
import { connect } from 'react-redux';

import If from './../If';

import Reservations, { Actions } from './../../scripts/reservations.js';

const today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

class ReservationEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      date: `${props.date.getFullYear()}-0${props.date.getMonth() + 1}-${props.date.getDate()}`,
      time: `${Math.floor(props.time / 60)}:${props.time % 60}0`,
      location: props.location,
      party: props.party
    };
    
    let bind = (field) => this.onFieldChange.bind(this, field);
    this.locationChange = bind("location");
    this.dateChange = bind("date");
    this.timeChange = bind("time");
    this.partyChange = bind("party");
    this.trySubmit = this.trySubmit.bind(this);
  }
  
  onFieldChange(field, e) {
    this.setState({[field]: e.target.value});
  }
  
  validateDate() {
    let d = new Date(this.state.date);
    return d >= today;
  }
  
  validateTime() {
    if (new Date(this.state.date) > today) return true;
    let now = new Date();
    let hour = parseInt(this.state.time.substring(0, this.state.time.indexOf(":")));
    return hour > now.getHours();
  }
  
  trySubmit() {
    console.log("trySubmit()");
    if (!(this.validateDate() & this.validateTime())) {
      console.log("invalid date/time");
      return;
    }
    let t = this.state.time;
    t = (parseInt(t.substring(0, t.indexOf(":"))) * 60) + (parseInt(t.substring(t.indexOf(':') + 1)));
    if (this.props.create) {
      let d = (new Date(this.state.date)).getTime();
      this.props.dispatch(
        Actions.submitReservation(d, t, this.state.location, parseInt(this.state.party))
      ).then(() => {
        this.props.submitted(d);
      });
      
    } else {
      let d = this.props.date.getTime();
      this.props.dispatch(
        Actions.updateReservation(d, t, this.props.location, parseInt(this.state.party))
      ).then(() => {
        this.props.submitted(d);
      });
    }
  }
  
  render() {
    return (
       <div className="form-container">
        <div className="form-row">
          <label htmlFor="location">Location</label>
          <select name="location" value={this.state.location}
            onChange={this.locationChange} disabled={!this.props.create}>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Antonio">San Antonio</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" value={this.state.date}
            onChange={this.dateChange} disabled={!this.props.create}/>
        </div>
        <If c={!this.validateDate()}>
          <div className="form-row error">
            <p>Date must be today, or in the future.</p>
          </div>
        </If>
        <div className="form-row">
          <label htmlFor="time">Time</label>
          <input type="time" name="time" value={this.state.time} onChange={this.timeChange}/>
        </div>
        <If c={!this.validateTime()}>
          <div className="form-row error">
            <p>Time must be in the future.</p>
          </div>
        </If>
        <div className="form-row">
          <label htmlFor="party">Number of Guests</label>
          <input type="number" name="party" value={this.state.party} onChange={this.partyChange}/>
        </div>
        <div className="form-row">
          <button onClick={this.trySubmit}>{this.props.create ? "Create Reservation" : "Update Reservation"}</button>
        </div>
      </div>
    );
  }
}

export default connect()(ReservationEditor);
