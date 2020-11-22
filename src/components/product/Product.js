import React from 'react';
import './Product.css';
import { Link, withRouter } from "react-router-dom";

class Product extends React.Component {
    render() {

        const item = this.props.item

        return (
            <div className="product-block">
                <Link className="product-link" 
                    to={`/product/${item.id}/`}
                >
                    <div className="block-image">
                            <img src={item.images.length > 0 ? item.images[0].image : null} alt="" />
                    </div>
                </Link>
                <Link title={item.name} 
                    className="product-link" 
                    to={`/product/${item.id}/`}
                >
                    <h4>{item.name}</h4>
                </Link>
                <p className="old-price"><s>{ item.old_price ? item.old_price : ''}</s></p>
                <p className={item.old_price ? "price old" : "price"}>{item.price}</p>
            </div>
        );
    }
}

export default withRouter(Product);
