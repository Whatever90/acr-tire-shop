import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll-to-element";
import "./Services.css";
import aws from '../images/aws.png';
// import rims from "../images/100816-cc-upcycle-your-recycling-with-great-ideas-for-old-car-parts-1.jpg";
// import repair from "../images/Car-Engine-Maintenance-cropped_iStock.png";
// import tires from "../images/Carr Parking Gl .jpg";

export default class Services extends Component {
  render() {
    return (
      <div className="services-main-container">
        <h1 className="services-title">WHAT WE DO</h1>
        <div className="services-inner-container">
          <div className="services-item">
            <Scroll type="id" element="_contact">
              <div className="services-item-content">
                <img className="img-fluid" src={aws} alt="service-1" />
                <h3 className="name">Repair/Maintenance</h3>
                <p className="services-item-description">
                  We provide a large spectrum of wheel service
                </p>
              </div>
            </Scroll>
          </div>

          <div className="services-item">
            <Link className="links" to="/tires" style={{ textDecoration: "none" }}>
              <div className="services-item-content">
                <img className="img-fluid" src={aws} alt="service-2" />
                <h3 className="name">Used Tires</h3>
                <p className="services-item-description">
                  Aenean tortor est, vulputate quis leo in, vehicula rhoncus
                  lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
                  finibus est, interdum justo suscipit id.
                </p>
              </div>
            </Link>
          </div>

          <div className="services-item">
            <Link className="links" to="/rims">
              <div className="services-item-content">
                <img className="img-fluid" src={aws} alt="service-3" />
                <h3 className="name">Rims</h3>
                <p className="services-item-description">
                  Aenean tortor est, vulputate quis leo in, vehicula rhoncus
                  lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
                  finibus est, interdum justo suscipit id.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}