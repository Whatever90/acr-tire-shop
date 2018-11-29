import React, { Component } from "react";
import "./Top.css";

export default class Top extends Component {
  render() {
    return (
      <div className="top-main-container">
        <div className="top-inner-container">
          <div className="top-content-container">
            <div className="top-info">
              <h2 className="text-center">ACR TIRE SHOP</h2>
              <p className="text-center">
              One of the original tire shops in North Seattle. We are your one-stop shop for all of your car care needs.
              ACR is professionally managed and certified, and we are local independent business.
              Our facility specializes in new and used wheels and rims. 
              We dedicate ourselves to provide you with quality work and superior customer service, by our certified and licensed technicians, while using only the highest and finest quality products.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
