import React, { Component } from "react";
import routes from "./routes/routes";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
