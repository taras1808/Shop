import { useState, useEffect } from 'react';
import './ProductsContainer.css';
import Product from '../../components/product/Product.js';
import TempProduct from '../../components/product/temp/TempProduct.js';

function ProductsContainer ({items, isLoaded, error}) {

	let content

	if (error) {
		content = (<div>Error: {error.message}</div>);
	} else if (!isLoaded) {
		content = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (<TempProduct key={index} />))
	} else {
		content = items.map((item, index) => (<Product key={index} item={item} />))
	}

	return (
		<div className="products-container">
			{ content }
		</div>
	)
}

export default ProductsContainer;
