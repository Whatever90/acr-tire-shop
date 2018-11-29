import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scroll from "react-scroll-to-element";
import "./Services.css";
import aws from '../images/aws.png';
import service from '../images/service.jpg';
import rims from '../images/rims.jpg';
import tires from '../images/tires.jpg'
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
                <img className="img-fluid" src={service} alt="service-1" />
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
                <img className="img-fluid" src={tires} alt="service-2" />
                <h3 className="name">Infinite number of different tires</h3>
                <p className="services-item-description">
                We carry snow, racing, all-season, summer tires and much more. If you are wondering about a tire size fitting on your vehicle, please don’t hesitate to call us at 206-367-8473. Our wheel and tire experts have over 100 years of combined experience and they are ready to help you out with any question. We also guarantee fitment or your money back.
                </p>
              </div>
            </Link>
          </div>

          <div className="services-item">
            <Link className="links" to="/rims">
              <div className="services-item-content">
                <img className="img-fluid" src={rims} alt="service-3" />
                <h3 className="name">Various Rims</h3>
                <p className="services-item-description">
                  Buy wheels, tires and accessories from a company YOU CAN TRUST. If you find a price that beats ours, call us. We have some of the lowest prices in the wheel and tire industry so you can get what you want at the lowest possible cogitst.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}