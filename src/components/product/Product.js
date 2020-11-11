import React from 'react';
import './Product.css';
import { Link, withRouter } from "react-router-dom";

class Product extends React.Component {
    render() {

        const item = this.props.item

        return (
            <div className="product-block">
                <Link className="product-link" to={`${this.props.match.url}/${item.id}`}>
                    <img src={item.image} alt="" />
                </Link>
                <Link className="product-link" to={`${this.props.match.url}/${item.id}`}>
                    <h4>{item.name}</h4>
                </Link>
                <p><s>{item.old_price}</s></p>
                <p>{item.price}</p>
            </div>
        );
    }
}

export default withRouter(Product);
