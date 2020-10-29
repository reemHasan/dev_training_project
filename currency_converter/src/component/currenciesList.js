
import React from "react";
import myJson from '../data/currencies_details.json';
import * as reactBootStrap from 'react-bootstrap';
//import Link from '../topbar-link/topbar-link';

class CurrenciesList extends React.Component {
    constructor() {
      super();
      this.state = {
       currencyList:[],
      }
    }

    componentDidMount() {
        this.setState({currencyList: myJson})
      };
    
    render () {
        const rows = this.state.currencyList.map((currency, index) =>{
            return (<tr>
                <td>{currency.Country_Name}</td>
                <td>{currency.Currency_Name}</td>
                <td>{currency.Currency_Symbol}</td>
                <td>{currency.ISO_code}</td>
                <td>{currency.Fractional_unit}</td>
              </tr>)
        });

        return (
          /* <table>
           <tbody>
               {rows}
           </tbody>
           </table>*/
        //console.log("Country_Name", this.state.currencyList)
        <reactBootStrap.Table responsive striped bordered hover variant="dark">
           <thead>
            <tr>
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
        )

    }
}
export default CurrenciesList;