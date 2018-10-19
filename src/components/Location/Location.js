import React, { Component } from 'react';
import "./Location.css";

export default class Location extends Component {
  render() {
    return (
      <div className="location">
        <div className="intro">
          <h2 className="text-center">Location </h2>
          <p className="text-center" style={{ color: "black" }}>
            We are located in Seattle at 14038 Lake City Way NE, WA 98107
          </p>
        </div>

        <iframe
          title="123"
          allowFullScreen=""
          frameBorder="0"
          width="100%"
          height="450"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5rAb7taP3tCOkMKQqVV6ixNhp_iSLsGA&amp;q=14038+Lake+City+Way+NE%2C+Seattle%2C+WA+98107&amp;zoom=15"
        />
      </div>
    )
  }
}
