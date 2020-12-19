import './ProductsContainer.css'
import Product from '../../components/product/Product.js'
import TempProduct from '../../components/product/temp/TempProduct.js'
import { useParams, useHistory } from'react-router-dom'

const limit = 6

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

	let arr = [1]

	let page = parseInt(parameters.get('page') ?? 0)

	for (let i = 2; i <= Math.ceil(items.total / limit); i++) {
		if ((i < 7 && page < 4) || (i > Math.ceil(items.total / limit) - 6 && page > Math.ceil(items.total / limit) - 5)) {
			arr.push(i)
		} else {
			if (page - 1 <= i && page + 3 >= i) {
				arr.push(i)
			} else if (i === Math.ceil(items.total / limit))  {
				arr.push(i)
			}
		}
	}

	if (page > 3) arr.splice(1, 1, "...")
	if (page < (Math.ceil(items.total / limit) - 4)) arr.splice(arr.length - 2, 1, "...")


	return (
		<div id="products-container-block">
			<div className="products-container">
				{ content }
			</div>
			<div id="products-container-navigation">
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (parseInt(parameters.get('page') ?? 0) <= 0) return

						parameters.set('page', (parseInt(parameters.get('page') ?? 1)) - 1)

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
								className={`products-container-navigation-content-item  ${(parseInt(parameters.get('page') ?? 0) + 1) === i ? 'active' : ''}`}
								onClick={_ => {
									if (i === '...') 
										parameters.set('page', arr[index + 1] > page ? arr[index - 1] : arr[index + 1] - 2)
									else
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
						if (parseInt(parameters.get('page') ?? 0) + 1 >= Math.ceil(items.total / limit)) return

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
