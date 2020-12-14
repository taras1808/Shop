import './ProductsContainer.css'
import Product from '../../components/product/Product.js'
import TempProduct from '../../components/product/temp/TempProduct.js'
import { useParams, useHistory } from'react-router-dom'


function ProductsContainer ({ items, isLoaded, error }) {

	const history = useHistory()

	const { categoryId, params } = useParams()
	
	const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	let content

	if (error) {
		content = (<div>Error: {error.message}</div>);
	} else if (!isLoaded) {
		content = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (<TempProduct key={index} />))
	} else {
		content = items.results.map((item, index) => (<Product key={index} item={item} />))
	}

	const arr = []

	for (let i = 1; i <= Math.ceil(items.total / 3.0); i++) {
		arr.push(i)
	}

	return (
		<div id="products-container-block">
			<div className="products-container">
				{ content }
			</div>
			<div id="products-container-navigation">
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (parseInt(parameters.get('page') ?? 0) <= 0) return

						parameters.set('page', (parseInt(parameters.get('page')) ?? 1) - 1)

						let params = Array.from(parameters)
							.filter(e => `${e[1]}`.length > 0)
							.map(e => e.join('='))
							.join(';')

						history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
					}}>
					<span className="products-container-navigation-arrow prev"></span>
				</div>
				<div className="products-container-navigation-content">
					{
						arr.map((i, index) => (
							<div key={index}
								className="products-container-navigation-content-item"
								onClick={_ => {
									parameters.set('page', i - 1)

									let params = Array.from(parameters)
										.filter(e => `${e[1]}`.length > 0)
										.map(e => e.join('='))
										.join(';')

									history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
								}}>{i}</div>
						))
					}
				</div>
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (parseInt(parameters.get('page') ?? 0) + 1 >= Math.ceil(items.total / 3.0)) return

						parameters.set('page', (parseInt(parameters.get('page') ?? 0) + 1))

						let params = Array.from(parameters)
							.filter(e => `${e[1]}`.length > 0)
							.map(e => e.join('='))
							.join(';')

						history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
					}}>
					<span className="products-container-navigation-arrow next"></span>
				</div>
			</div>
		</div>
	)
}

export default ProductsContainer;
