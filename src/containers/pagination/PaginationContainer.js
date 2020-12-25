import './PaginationContainer.css'
import { useParams, useHistory } from'react-router-dom'

const limit = 6

export default function PaginationContainer ({ total }) {

	const history = useHistory()

    const { categoryId, params } = useParams()

    const pagesCount = Math.ceil(total / limit)

	const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	let arr = [1]

	const page = parseInt(parameters.get('page') ?? 1)

	for (let i = 2; i <= pagesCount; i++) {
		if ((i < 7 && page < 4) || (i > pagesCount - 6 && page > pagesCount - 5)) {
			arr.push(i)
		} else {
			if (page - 1 <= i && page + 3 >= i) {
				arr.push(i)
			} else if (i === pagesCount)  {
				arr.push(i)
			}
		}
	}

	if (page > 3) arr.splice(1, 1, "...")
	if (page < (pagesCount - 4)) arr.splice(arr.length - 2, 1, "...")


	return (
			<div id="products-container-navigation">
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (page <= 1) return

						parameters.set('page', page - 1)

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
								className={`products-container-navigation-content-item  ${page === i ? 'active' : ''}`}
								onClick={_ => {
									if (i === '...') 
										parameters.set('page', arr[index + 1] > page ? arr[index - 1] : arr[index + 1] - 2)
									else
										parameters.set('page', i)

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
						if (page >= pagesCount) return

						parameters.set('page', page + 1)

						let params = Array.from(parameters)
							.filter(e => `${e[1]}`.length > 0)
							.map(e => e.join('='))
							.join(';')

						history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
					}}>
					<span className="products-container-navigation-arrow next"></span>
				</div>
			</div>
	)
}
