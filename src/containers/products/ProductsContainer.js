import { useState, useEffect } from 'react';
import './ProductsContainer.css';
import Product from '../../components/product/Product.js';
import TempProduct from '../../components/product/temp/TempProduct.js';

function ProductsContainer (props) {

    
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		setIsLoaded(false)
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
