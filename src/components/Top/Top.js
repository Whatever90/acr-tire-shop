import React, { Component } from "react";
import "./Top.css";

export default class Top extends Component {
  render() {
    return (
      <div>
        <div className="projects-clean">
          <div className="container">
            <div className="intro">
              <h2 className="text-center">ACR TIRE SHOP</h2>
              <p className="text-center" style={{ color: "black" }}>
                One of the best maintenace shop in Seattle. We are focused on
                european brands such as Volvo, Saab, BWM, Mercedes, and Audi.
                Affortable prices guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
