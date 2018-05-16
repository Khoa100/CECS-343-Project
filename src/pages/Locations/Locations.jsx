import React, { Component } from 'react';

import Page from './../../components/Page';

const Location = (props) => {
  return(
    <div className="location">
      <img src={props.img} alt={`Dave's Bistro - ${props.city}`} className="location-preview"/>
      <div className="location-details">
        <p>City: {props.city}</p>
        <p>Phone: {props.phone}</p>
        <p>Address: {props.addr}</p>
      </div>
    </div>
  );
};

class Locations extends Component {
  render() {
    return(
      <Page title="Dave's Bistro - Locations">
        <div className="content">
          <img src="/static/images/header/locations_header.jpg" alt="Locations"/>
          <Location
            img="/static/images/locations/davesbistro_losangeles.jpg"
            city="Los Angeles"
            phone="(310) 555-4567"
            addr="343 Sunset Blvd. Los Angeles, CA 90210"
            />
          <Location
            img="/static/images/locations/davesbistro_texas.jpg"
            city="San Antonio"
            phone="(210) 555-7777"
            addr="81 Cowboy Rd. San Antonio, Tx 78234"
            />
        </div>
      </Page>
    );
  }
}

export default Locations;
