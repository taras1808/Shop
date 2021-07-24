import { useState, useEffect } from 'react'
import './FavouriteContainer.css'
import { accountService } from '../../_services/account.service'
import ProductsContainer from '../products/ProductsContainer.js'
import { useParams } from 'react-router-dom'
import NavBar, { NavType } from '../navbar/NavBar'
import ParamsContainer from '../params/ParamsContainer.js'


export default function FavouriteContainer() {

	const { params } = useParams()

	const [state, setState] = useState(params)

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])
	
	useEffect(() => {
		if (state !== params) {
			window.scrollTo({ top: 0 })
			setState(params)
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params])

    useEffect(() => {
		
		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		let query = [
			`?orderBy=${parameters.get('orderBy') ? parameters.get('orderBy') : ''}`,
			`page=${parameters.get('page') ? parseInt(parameters.get('page')) - 1 : ''}`
		]

		query = query.join('&')

        accountService.getFavourite(query)
			.then(
				(result) => {
					setItems(result)
					setError()
					setIsLoaded(true)
				},
				(error) => {
					setError(error)
					setIsLoaded(true)
				}
			)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

    return (
		<>
			<NavBar type={NavType.FAVOURITE}/>
			<ParamsContainer count={items.total} favourite/>
			<div className="favourite">
				<ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error}
					limit={8} />
			</div>
		</>
    )
}
