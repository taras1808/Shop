import { useState, useEffect } from 'react'
import './FavouriteContainer.css'
import { authenticationService } from '../../_services/authentication.service'
import { accountService } from '../../_services/account.service'
import ProductsContainer from '../products/ProductsContainer.js'
import { useParams } from 'react-router-dom'


export default function FavouriteContainer() {

	const currentUser = authenticationService.currentUserValue
	
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
			`?page=${parameters.get('page') ? parseInt(parameters.get('page')) - 1 : ''}`
		]

        accountService.getFavourite(currentUser, query)
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
	}, [state])

    return (
        <div id="favourite-block">
            <h1>Favourite things</h1>
            <ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error} />
        </div>
    )
}
