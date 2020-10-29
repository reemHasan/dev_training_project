import React from "react";
import axios from "axios";
import products from "../data/products.json"
import Product from "./product"
import { Container } from 'reactstrap'

class ProductPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded:false,
            currencies:null
        };
      }
      
      componentDidMount() {
        console.log('in');
        axios
            .get("https://api.exchangeratesapi.io/latest")
            .then(response => {this.setState({ currencies: response.data.rates });})
            .catch(err => {this.setState({error:err});})
            .finally(response => {this.setState({isLoaded:true});});  
      }

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
          );
        }
    }    
}

export default ProductPrice;
