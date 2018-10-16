import React, { Component } from 'react';
import "./Location.css";

export default class Location extends Component {
  render() {
    return (
      <div className="map-clean">
        <div className="container">
          <div className="intro">
            <h2 className="text-center">Location </h2>
            <p className="text-center" style={{ color: "black" }}>
              We are located in Ballard, Seattle at 1440 NW Leary Way,
              Seattle, WA 98107
            </p>
          </div>
        </div>
        <iframe
          title="123"
          allowFullScreen=""
          frameBorder="0"
          width="100%"
          height="450"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5rAb7taP3tCOkMKQqVV6ixNhp_iSLsGA&amp;q=1440+NW+Leary+Way%2C+Seattle%2C+WA+98107&amp;zoom=15"
        />
      </div>
    )
  }
}
