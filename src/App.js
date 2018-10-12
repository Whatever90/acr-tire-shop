import React, { Component } from "react";
import routes from "./routes/routes";
import "./App.css";

import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div>
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
