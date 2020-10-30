import React from "react";
import axios from "axios";

import ProductPrice from "./productPrice"

class Product extends React.Component {

    convert_prices(from) {
        const {prices} = this.props.data;
        const apiValues = [];
        const eur = prices.reduce((a, b) => {
            if (a['code'] === from) {
                return a;
            }
        });
        console.log(this.props.currencies)
        prices.map((item) => {
            if (item['code'] === from) {
                apiValues.push(eur['value']);
            }
            else {
                apiValues.push(parseInt(eur['value']) * parseInt(this.props.currencies[item['code']]));
            }
        });
        return apiValues;
    }

    render() {
        const {label, link, prices} = this.props.data;
        const apiValues = this.convert_prices('EUR');
        return (
            <div>
                <h3>{label}</h3>
                <a href={link}></a>
                <table class="table" striped bordered hover variant="dark">
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">Currency Code</th>
                        <th scope="col">Website Price</th>
                        <th scope="col">Converted price (currencies to EUR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prices.map((price, i) => {
                            return (
                                <ProductPrice key={i} data={price} apiValue={apiValues[i]}></ProductPrice>        
                            );
                        })}
                    </tbody>
                </table>


    
            </div>
        );
    }
}

export default Product;

