import { React, useState, useEffect } from 'react';
import './ProductsContainer.css';
import Product from '../../components/product/Product.js';

function ProductsContainer (props) {

    
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		console.log(props.search)
		fetch("http://192.168.0.108:7777/" + props.search)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
					setError();
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [props.search])
  
	if (error) {
	  	return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
	  	return (
			<div className="products-container">
				{
		  			items.map((item, index) => (
						<Product key={index} item={item} />
		  			))
			  	}
			</div>
	  	);
	}
}

export default ProductsContainer;
