import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import converter from "./converter.css";
import { Button, Container } from 'reactstrap'
import products from "../../data/products.json"
import Product from "../product/Product"

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      result: null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
      currencies: []
    };
  }
  componentDidMount() {
    axios
    .get("https://api.exchangeratesapi.io/latest")
    .then(response => {this.setState({ currencies: response.data.rates });})
    .catch(err => {this.setState({error:err});})
    .finally(response => {this.setState({isLoaded:true});});  
    // axios
    //   .get("https://api.exchangeratesapi.io/latest")
    //   .then(response => {
    //     const currencyAr = ["EUR"];
    //     for (const key in response.data.rates) {
    //       currencyAr.push(key);
    //     }
    //     this.setState({ currencies: currencyAr });
    //   })
    //   .catch(err => {
    //     console.log("oppps", err);
    //   });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        .then(response => {
          const result =
            this.state.amount * response.data.rates[this.state.toCurrency];
          this.setState({ result: result.toFixed(5) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  selectHandler = event => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };

  render() {
    const {error, isLoaded, currencies} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <Container style={{ marginTop: 20 }}>
        <Product data={products[0]} currencies={currencies}></Product>
      </Container>
        // <Container style={{ marginTop: 20 }}>
        //   <div className="Converter">
        //   <h2>
        //     <span>Currency</span>Converter
        //     <span role="img" aria-label="money">
        //       &#x1f4b5;
        //     </span>
        //   </h2>
        //   <div className="Form">
        //     <input
        //       name="amount"
        //       type="text"
        //       value={this.state.amount}
        //       onChange={event => this.setState({ amount: event.target.value })}
        //     />
        //     <select
        //       name="from"
        //       onChange={event => this.selectHandler(event)}
        //       value={this.state.fromCurrency}
        //     >
        //       {this.state.currencies.map(cur => (
        //         <option key={cur}>{cur}</option>
        //       ))}
        //     </select>
        //     <select
        //       name="to"
        //       onChange={event => this.selectHandler(event)}
        //       value={this.state.toCurrency}
        //     >
        //       {this.state.currencies.map(cur => (
        //         <option key={cur}>{cur}</option>
        //       ))}
        //     </select>
        //     <Button onClick={this.convertHandler}>Convert</Button>
        //     { <h3>The result of converted amount is <span>{this.state.result}</span></h3>}
        //   </div>
        // </div>
        // </Container>
      );
    }
  }
}

export default Converter;
