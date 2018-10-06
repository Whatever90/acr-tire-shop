import React, { Component } from 'react';
import './Top.css';
import { Link } from 'react-router-dom';
import Scroll from 'react-scroll-to-element';
// import aws from '../images/aws.png';
import rims from "../images/100816-cc-upcycle-your-recycling-with-great-ideas-for-old-car-rims-1.jpg";
import repair from "../images/Car-Engine-Maintenance-cropped_iStock.png";
import cars from "../images/Carr Parking Gl .jpg"
import "./Footer-Dark.css";
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
                            <p className="text-center" style={{ color: "black" }}>One of the best maintenace shop in Seattle. We are focused on european brands such as Volvo, Saab, BWM, Mercedes, and Audi. Affortable prices guarantee.</p>
                        </div>
                        <div className="row justify-content-center align-items-center projects">
                            <Scroll type="id" element="_contact">
                                <div className="col-sm-6 col-lg-4 item scrolling-item" style={{ color: "black" }}>
                                    <img className="img-fluid" src={repair} alt="hui1"></img>
                                    <h3 className="name">Repair/Maintenance</h3>
                                    <p className="description" style={{ color: "black" }}>We provide a large spectrum of car service</p>
                                </div>
                            </Scroll>

                            <Link className="links" to="/cars">
                                <div className="col-sm-6 col-lg-4 item">
                                    <img className="img-fluid" src={cars} alt="hui2" ></img>
                                    <h3 className="name">Used Cars</h3>
                                    <p className="description" style={{ color: "black" }}>Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                                </div>
                            </Link>

                            <Link className="links" to="/rims"><div className="col-sm-6 col-lg-4 item">
                                <img className="img-fluid" src={rims} alt="hui3"></img>
                                <h3 className="name">Rims</h3>
                                <p className="description" style={{ color: "black" }}>Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                            </div></Link>
                        </div>
                    </div>
                </div>
                <div className="map-clean">
                    <div className="container">
                        <div className="intro">
                            <h2 className="text-center">Location </h2>
                            <p className="text-center" style={{ color: "black" }}>We are located in Ballard, Seattle at 1440 NW Leary Way, Seattle, WA 98107</p>
                        </div>
                    </div>
                    <iframe title="123" allowFullScreen="" frameBorder="0" width="100%" height="450" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD5rAb7taP3tCOkMKQqVV6ixNhp_iSLsGA&amp;q=1440+NW+Leary+Way%2C+Seattle%2C+WA+98107&amp;zoom=15"></iframe>
                </div>
            </div>


        );
    }
}