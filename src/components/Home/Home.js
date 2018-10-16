import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Top from "../Top/Top";
import Services from "../Services/Services";
import Location from "../Location/Location";
import Contact from "../Contact/Contact";


export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Top />
        <Services />
        <Location />
        <Contact />
      </div>
    );
  }
}
