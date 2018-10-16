import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Top from "../Top/Top";
import Contact from "../Contact/Contact";
import Location from "../Location/Location";


export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Top />
        <Location />
        <Contact />
      </div>
    );
  }
}
