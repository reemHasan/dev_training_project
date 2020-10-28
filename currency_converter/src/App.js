import React, { Component } from "react";

import "./App.css";
import Converter from "./component/converter";
import NavigatBar from "./component/navBar";

class App extends Component {
  render() {
    return (
      <>
    <NavigatBar />
    <Converter />
    </>
    );

  }
}

export default App;
