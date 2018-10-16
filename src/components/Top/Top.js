import React, { Component } from "react";
import "./Top.css";
import { Link } from "react-router-dom";
import Scroll from "react-scroll-to-element";
// import aws from '../images/aws.png';
import rims from "../images/100816-cc-upcycle-your-recycling-with-great-ideas-for-old-car-parts-1.jpg";
import repair from "../images/Car-Engine-Maintenance-cropped_iStock.png";
import tires from "../images/Carr Parking Gl .jpg";
import "./Map-Clean.css";
import "./Projects-Clean.css";
import "./styles.css";

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
            <div className="row justify-content-center align-items-center projects">
              <Scroll type="id" element="_contact">
                <div
                  className="col-sm-6 col-lg-4 item scrolling-item"
                  style={{ color: "black" }}
                >
                  <img className="img-fluid" src={repair} alt="hui1" />
                  <h3 className="name">Repair/Maintenance</h3>
                  <p className="description" style={{ color: "black" }}>
                    We provide a large spectrum of wheel service
                  </p>
                </div>
              </Scroll>

              <Link className="links" to="/tires">
                <div className="col-sm-6 col-lg-4 item">
                  <img className="img-fluid" src={tires} alt="hui2" />
                  <h3 className="name">Used Tires</h3>
                  <p className="description" style={{ color: "black" }}>
                    Aenean tortor est, vulputate quis leo in, vehicula rhoncus
                    lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
                    finibus est, interdum justo suscipit id.
                  </p>
                </div>
              </Link>

              <Link className="links" to="/rims">
                <div className="col-sm-6 col-lg-4 item">
                  <img className="img-fluid" src={rims} alt="hui3" />
                  <h3 className="name">Rims</h3>
                  <p className="description" style={{ color: "black" }}>
                    Aenean tortor est, vulputate quis leo in, vehicula rhoncus
                    lacus. Praesent aliquam in tellus eu gravida. Aliquam varius
                    finibus est, interdum justo suscipit id.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
