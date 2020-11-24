
import React from "react";
import myJson from '../data/currencies_details.json';
import Image from 'react-bootstrap/Image';
import * as reactBootStrap from 'react-bootstrap';
import TableScrollbar from 'react-table-scrollbar';
import "./currenciesList.css"
//import Link from '../topbar-link/topbar-link';

class CurrenciesList extends React.Component {
    constructor() {
      super();
      this.state = {
       currencyList:[],
       image_source: '',
      }
    }

    componentDidMount() {
        this.setState({currencyList: myJson})
    }
    
    
    render () {
      const rows = this.state.currencyList.map((currency, index) =>{
          return (
            <tr>
                <td><Image src={'${process.env.PUBLIC_URL}',currency.flag_source}/></td>
                <td>{currency.Country_Name.toString('utf8')}</td>
                <td>{currency.Currency_Name}</td>
                <td>{currency.Currency_Symbol.toString('utf8')}</td>
                <td>{currency.ISO_code}</td>
                <td>{currency.Fractional_unit}</td>
            </tr>
          )  

      });
    console.log(this.state.currencyList)
      return (     
        <div class="container">
          <h3>List of supported currencies and their countries</h3>
          <reactBootStrap.Table responsive striped bordered hover variant="dark" className='mt-5'>
            <thead>
              <tr>
                <th>Country Flag</th>   
                <th>Country Name</th>
                <th>Currency Name</th>
                <th>Currency Symbol</th>
                <th>ISO Code</th>
                <th>Fractional Unit</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </reactBootStrap.Table>
        </div>
        );

    }
}
export default CurrenciesList;