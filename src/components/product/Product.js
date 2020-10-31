import React from 'react';
import './Product.css';

class Product extends React.Component {
    render() {

        const item = this.props.item

        return (
            <div className="product-block">
                <div className="block">
                    <img src={item.url} alt="" />
                    <h4>{item.name}</h4>
                    <p><s>{item.old_price}</s></p>
                    <p>{item.price}</p>
                </div>
            </div>
        );
    }
}

export default Product;
