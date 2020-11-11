import { useState, useEffect } from 'react';
import './ProductsContainer.css';
import Product from '../../components/product/Product.js';
import TempProduct from '../../components/product/temp/TempProduct.js';
import { useParams } from "react-router-dom"

function ProductsContainer ({producers, priceRange}) {

	let { categoryId } = useParams()
	
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		setIsLoaded(false)
		fetch("http://192.168.0.108:7777/api/categories/" +  categoryId + "/products?producers=" + producers + "&price=" + priceRange)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true)
					setItems(result)
					setError()
				},
				(error) => {
					setIsLoaded(true)
					setError(error)
				}
			)
	}, [categoryId, producers, priceRange])

  

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
