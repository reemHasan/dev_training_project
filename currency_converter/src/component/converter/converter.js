import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import converter from "./converter.css";
import { Button, Container } from 'reactstrap'

class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      oneUnit:null,
      fromCurrency: "USD",
      toCurrency: "GBP",
      amount: 1,
      currencies: []
    };
  }
  // initializ the list of currencies
  componentDidMount() {
    axios
      .get("https://api.exchangeratesapi.io/latest")
      .then(response => {
        const currencyAr = ["EUR"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch(err => {
        console.log("oppps", err);
      });
  }
// catch the event of clicking the button Convert
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
        axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${
            this.state.fromCurrency
          }&symbols=${this.state.toCurrency}`
        )
        // get the rate for one unit of converted currency
        .then(response => {
          const oneunit =response.data.rates[this.state.toCurrency];
          this.setState({ oneUnit: oneunit.toFixed(5) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
        
    } else {
      this.setState({ result: "You can not convert the same currency!" });
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
    return (
      <Container style={{ marginTop: 20 }}>
      <div className="Converter">
        <h2>
          <span>Currency</span>Converter
          <span role="img" aria-label="money">
            &#x1f4b5;
          </span>
        </h2>
        <div className="Form">
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="from"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <select
            name="to"
            onChange={event => this.selectHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          <Button onClick={this.convertHandler}>Convert</Button>
          <div>
          <span> </span>
          {this.state.result && <h5> 1 {this.state.fromCurrency} is equal to {this.state.oneUnit} {this.state.toCurrency}</h5>}
          <br />
          {this.state.result && <h3>The result of converted amount is <span>{this.state.result}</span></h3>}
          </div>
        </div>
      </div>
      </Container>
    );
  }
}

export default Converter;
