import React from "react";

class ProductPrice extends React.Component {

    render() {
        const {code, value} = this.props.data;
        return (
            <tr>
                <td>{code}</td>
                <td>{value === null ? "?" : value}</td>
                <td>{this.props.apiValue}</td>
            </tr>
        );
    }
}

export default ProductPrice;

