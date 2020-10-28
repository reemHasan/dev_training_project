import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import converter from "./converter.css";
import { Button, Container } from 'reactstrap'
import Select from 'react-select'
import {FormControl,Form,Col} from 'react-bootstrap'

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
          currencyAr.push({value:key});
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
      <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="col-10 col-md-8 col-lg-6">
        <Form>
          <div classNmae="title">
           <h2>
            <span>Currency</span>Converter
            <span role="img" aria-label="money">
            &#x1f4b5;
            </span>
           </h2>
          </div>
          <br/>
         <Form.Group controlId="exampleForm.ControlInput1">
           <Form.Label>Amount </Form.Label>
           <Form.Control type="text" placeholder="Enter amount here"          
           name="amount"
          onChange={event => this.setState({ amount: event.target.value })}/>
         </Form.Group>

         <Form.Group controlId="exampleForm.ControlSelect1">
           <Form.Label >Source Currency</Form.Label>
           <Form.Control as="select" name="from" 
           onChange={event => this.selectHandler(event)}
           value={this.state.fromCurrency}
           >
           {
               this.state.currencies.map((option, index) => {
                return (<option key={index} value={option.value}>{option.value}</option>)
                  })
                 }
           </Form.Control>
         </Form.Group>

         <Form.Group controlId="exampleForm.ControlSelect2">
           <Form.Label >Distination Currency</Form.Label>
           <Form.Control as="select" name='to'
           onChange={event => this.selectHandler(event)}
           value={this.state.toCurrency}
           >
           {
               this.state.currencies.map((option, index) => {
                return (<option key={index} value={option.value}>{option.value}</option>)
                  })
                 }
           </Form.Control>
         </Form.Group>
         <div>
         <Button className="button" onClick={this.convertHandler}>Convert</Button>
           <br/>
           <br/>
         {this.state.result && <div className="divConvert">
          <h5> 1 {this.state.fromCurrency} is equal to {this.state.oneUnit} {this.state.toCurrency}</h5>
          <br />
          <h3>The result of converted amount is <span>{this.state.result}</span></h3>
         </div>}
        </div>
      </Form>
      {/*Form end */}
        </div>
    </div>
</div>

    );
  }
}

export default Converter;
