import './PaginationContainer.css'
import { useParams, useHistory, Link, useRouteMatch } from 'react-router-dom'
import { build } from '../../_utils/params-utils'

export default function PaginationContainer ({ total, limit = 6 }) {

	const history = useHistory()

	const { categoryId, params } = useParams()
	
	const match = useRouteMatch('/(search|catalog|favourite)/')

    const pagesCount = Math.ceil(total / limit)

	const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	let arr = [1]

	const page = parseInt(parameters.get('page') ?? 1)

	for (let i = 2; i <= pagesCount; i++) {
		if ((i < 7 && page < 4) || (i > pagesCount - 6 && page > pagesCount - 4)) {
			arr.push(i)
		} else {
			if (page - 2 <= i && page + 2 >= i) {
				arr.push(i)
			} else if (i === pagesCount)  {
				arr.push(i)
			}
		}
	}

	if (page > 4 && pagesCount > 7) arr.splice(1, 1, "...")
	if (page < (pagesCount - 3) && pagesCount > 7) arr.splice(arr.length - 2, 1, "...")

	if (pagesCount <= 1 && page > 1) {
		const url = build(params, 'page', null)
		history.push(`/${categoryId ? `catalog/${categoryId}` : match.params[0]}/${url}`)
	}

	return pagesCount > 1 ? (
			<div id="products-container-navigation">
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (page <= 1) return

						const url = build(params, 'page', page - 1)
						history.push(`/${categoryId ? `catalog/${categoryId}` : match.params[0]}/${url}`)
					}}>
					<span className="products-container-navigation-arrow prev"></span>
				</div>
				<div className="products-container-navigation-content">
					{
						arr.map((i, index) => (
							<Link to={`/${categoryId ? `catalog/${categoryId}` : match.params[0]}/${build(params, 'page', i === '...' ? (arr[index + 1] > page ? arr[index - 1] + 1 : arr[index + 1] - 1) : i)}`} key={index}
								className={`products-container-navigation-content-item  ${page === i ? 'active' : ''}`}>{i}</Link>
						))
					}
				</div>
				<div className="products-container-navigation-arrow-block"
					onClick={_ => {
						if (page >= pagesCount) return

						const url = build(params, 'page', page + 1)
						history.push(`/${categoryId ? `catalog/${categoryId}` : match.params[0]}/${url}`)
					}}>
					<span className="products-container-navigation-arrow next"></span>
				</div>
			</div>
	) : null
}
