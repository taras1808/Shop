import './ProductsContainer.css'
import Product from '../../components/product/Product.js'
import TempProduct from '../../components/product/temp/TempProduct.js'
import PaginationContainer from'../pagination/PaginationContainer'

export default function ProductsContainer ({ items, isLoaded, error, limit }) {

	let content

	if (error) {
		content = (<div>Error: { error.message }</div>)
	} else if (!isLoaded) {
		content = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (<TempProduct key={index} />))
	} else if (items && items.results && items.results.length > 0) {
		content = items.results.map((item, index) => (<Product key={index} item={item} />))
	} else {
		content = (<div className="products-not-found">Not found</div>)
	}

	return (
		<div id="products-container-block">
			<div className="products-container">
				{ content }
			</div>
			<PaginationContainer total={items.total} limit={limit}/>
		</div>
	)
}
