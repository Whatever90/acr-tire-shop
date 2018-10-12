import React, { Component } from "react";
import Top from "../Top/Top";
import Contact from "../Contact/Contact";
import Navbar from "../Navbar/Navbar";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Top />
        <Contact />
      </div>
    );
  }
}
