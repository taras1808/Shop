import React from 'react';
import './Product.css';
import { Link, withRouter } from "react-router-dom";

class Product extends React.Component {
    render() {

        const item = this.props.item

        return (
            <div className="product-block">
                <Link className="product-link" to={`${this.props.match.url}/${item.id}`}>
                    <div className="block-image">
                            <img src={item.image} alt="" />
                    </div>
                </Link>
                <Link title={item.name} className="product-link" to={`${this.props.match.url}/${item.id}`}>
                    <h4>{item.name}</h4>
                </Link>
                <p><s>{ Math.round(item.price * 1.5) }</s></p>
                <p className="price">{item.price}</p>
            </div>
        );
    }
}

export default withRouter(Product);
