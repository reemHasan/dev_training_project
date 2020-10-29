import React, { Component } from "react";

import "./App.css";
import Converter from "./component/converter";
import About from "./component/about";
import CurrenciesList from "./component/currenciesList";
import Products from "./component/products.js";
import NavigatBar from "./component/navBar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {FormControl,NavDropdown,Navbar,Nav,Form,Button} from 'react-bootstrap'
class App extends Component {
  render() {
    return (
    <>
    <NavigatBar />
    <Router> 
      <Route exact path="/" component={Converter} />
      <Route path="/about" component={About} />
      <Route path="/currenciesList" component={CurrenciesList} />
      <Route path="/productCompare" component={Products} />
    </Router>
     </>
    );

  }
}
export default App;
