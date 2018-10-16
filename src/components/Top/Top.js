import React, { Component } from "react";
import "./Top.css";
import { Link } from "react-router-dom";
import Scroll from "react-scroll-to-element";
// import aws from '../images/aws.png';
import rims from "../images/100816-cc-upcycle-your-recycling-with-great-ideas-for-old-car-parts-1.jpg";
import repair from "../images/Car-Engine-Maintenance-cropped_iStock.png";
import tires from "../images/Carr Parking Gl .jpg";
import "./Projects-Clean.css";

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
