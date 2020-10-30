import React, { Component } from "react";
//import {Navbar,Nav,Form,Button} from 'reactstrap'
import {Navbar,Nav} from 'react-bootstrap'

class NavigatBar extends Component {
render() {
return (
<div>
<Navbar expand="lg" bg="dark" variant="dark">
    <Navbar.Brand to="/">CurrencyConveter</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/currenciesList">Currencies</Nav.Link>
        <Nav.Link href="/productCompare">Compare Products</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</div>
    );
    }
  }

  export default NavigatBar;