
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

       // var image=require('./ad.png');
        const rows = this.state.currencyList.map((currency, index) =>{
            //this.setState({ image_source: currency.flag_source });
            return (
            <tr>
                {/*<td><Image src={require(this.state.image_source)}/></td>*/}
                <td><Image src={require('./images/fr.png')}/></td>
                <td>{currency.Country_Name.toString('utf8')}</td>
                <td>{currency.Currency_Name}</td>
                <td>{currency.Currency_Symbol.toString('utf8')}</td>
                <td>{currency.ISO_code}</td>
                <td>{currency.Fractional_unit}</td>
                {/*console.log({currency.flag_source});*/}
              </tr>)

        });
    console.log(this.state.currencyList)
      return (
            
      <div class="container">
          <div>
              <h1>List of supported currencies and thier coutries</h1>
          </div>
        <div class="row">
        <div class="col-10">
            {/*class='flags-table flex-vertical'*/}
            <TableScrollbar>
            <reactBootStrap.Table responsive striped bordered hover variant="dark" className='mt-5'>
           <thead >
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
          </TableScrollbar>
          </div>
         </div>
        </div>
        )

    }
}
export default CurrenciesList;