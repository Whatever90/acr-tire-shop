import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default" id="nav">
          <div className="container">
            <input type="checkbox" id="navbar-toggle-cbox" />
            <div className="navbar-header">
              <label
                htmlFor="navbar-toggle-cbox"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </label>
              <p className="navbar-brand">A.C.R.</p>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li className="listLink" id="homeLink">
                  <Link className="links" to="/">
                    <p>Home</p>
                  </Link>
                </li>
                <li className="listLink">
                  <Link className="links" to="/tires">
                    <p>Tires</p>
                  </Link>
                </li>
                <li className="listLink">
                  <Link className="links" to="/rims">
                    <p>Rims</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
