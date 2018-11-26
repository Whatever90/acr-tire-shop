import React, { Component } from 'react';
import './Popup.css';

export default class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <h1>Your request has been sent. We will contact soon. <br/> Thank you!</h1>
        <button className="round-border popup-button" onClick={this.props.closePopup}>OK</button>
      </div>
    );
  }
}