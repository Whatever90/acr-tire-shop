import React, { Component } from 'react';
import './PopupOneProduct.css';

export default class PopupOneProduct extends Component {
  render() {
    return (
      <div className="popup-one-product bd-black">
        <h1>Your request has been sent. We will contact soon. <br/> Thank you!</h1>
        <button className="round-border popup-button-one-product" onClick={this.props.closePopup}>OK</button>
      </div>
    );
  }
}