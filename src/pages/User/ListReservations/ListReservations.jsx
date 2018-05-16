import React, { Component } from 'react';

import { SecurePage } from './../../../components/Page';
import ReservationList from './../../../components/ReservationList';

class ListReservations extends Component {
  constructor(props) {
    super(props);
    
    let d = new Date();
    d.setMilliseconds(0);
    d.setSeconds(0);
    d.setMinutes(0);
    d.setHours(0);
    d.setDate(0);
    this.state = {
      d: d
    };
    
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
  }
  
  nextMonth() {
    let newD = new Date(this.state.d);
    newD.setMonth(this.state.d.getMonth() + 1);
    this.setState({d: newD});
  }
  
  prevMonth() {
    let newD = new Date(this.state.d);
    newD.setMonth(this.state.d.getMonth() - 1);
    this.setState({d: newD});
  }
  
  render() {
    const startDate = new Date(this.state.d);
    const endDate = new Date(this.state.d);
    endDate.setMonth(this.state.d.getMonth() + 1);
    
    return(
      <SecurePage title="Dave's Bistro - Reservations">
        <div className="content">
          <div className="list-header">
            <div className="left"><button onClick={this.prevMonth}>&lt; Previous month</button></div>
            <div className="center">
              <h4>
                {`${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`} - 
                {`${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`}
              </h4>
            </div>
            <div className="right"><button onClick={this.nextMonth}>Next month &gt;</button></div>
          </div>
          <div className="list-container">
            <ReservationList start={this.state.d.getTime()} end={endDate.getTime()}/>
          </div>
        </div>
      </SecurePage>
    );
  }
}

export default ListReservations;
