import React from "react";
import axios from "axios";
import "./converter.css";
import { Button} from 'reactstrap'
import {FormControl,Form} from 'react-bootstrap'

const styles = {
  "textCenter" : {
    textAlign:"center"    
  },
  "title": {
    fontSize:"2rem"
  }
};

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
        this.setState({ currencies: currencyAr, pCurrencies: response.data.rates});
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
        <div class="row justify-content-center align-items-center">
          <div style={styles.textCenter}>
            <h1 style={styles.title}>
              <span>Currency</span>Converter
              <span role="img" aria-label="money">
              &#x1f4b5;
              </span>
            </h1>
          </div>
        </div>
        <br/>
        <Form>
          <Form.Row className="justify-content-center">
              <Form.Label>Amount </Form.Label>
          </Form.Row>
          <Form.Row className="justify-content-center">
              <Form.Control type="text" placeholder="Enter amount here"          
                name="amount"
                onChange={event => this.setState({ amount: event.target.value })}/>
          </Form.Row>
          <Form.Row className="justify-content-center">
              <Form.Label >Source Currency</Form.Label>
          </Form.Row>
          <Form.Row className="justify-content-center">
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
          </Form.Row>
          <Form.Row className="justify-content-center">
              <Form.Label >Distination Currency</Form.Label>
          </Form.Row>
          <Form.Row className="justify-content-center">
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
          </Form.Row>
          <div className="row justify-content-center">
          <Button className="button" onClick={this.convertHandler}>Convert</Button>
            <br/>
            <br/>
            {this.state.result && <div className="divConvert">
            <h5> 1 {this.state.fromCurrency} is equal to {this.state.oneUnit} {this.state.toCurrency}</h5>
            <br />
            <h4>The result of converted amount is <span>{this.state.result}</span></h4>
            </div>}
          </div>
        </Form>
      <p class="copyright">&copy; Currency Converter supplied by <a href="https://api.exchangeratesapi.io">Foreign exchange rates API</a>.</p>
</div>

    );
  }
}

export default Converter;
