import './SearchContainer.css'
import FiltersContainer from '../filters/FiltersContainer.js'
import ParamsContainer from '../params/ParamsContainer.js'
import ProductsContainer from '../products/ProductsContainer.js'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { searchService } from '../../_services/search.service'
import NavBar, { NavType } from '../navbar/NavBar'


export default function SearchContainer () {

    const { params } = useParams()

	const [state, setState] = useState(params)
	const [filters, setFilters] = useState(null)

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useEffect(() => {
		if (state !== params){
			// window.scrollTo({ top: 0 })
			setState(params)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params])

	useEffect(() => {
		setIsLoaded(false)

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		let query = []

		parameters.forEach((value, key) => {
			if (value && value.length > 0)
				query.push(key + '=' + value)
		})

		query = query.join('&')

		if (query.length > 0)
			query = '?' + query

		searchService.getFilters(query)
			.then(
				(result) => setFilters(result),
				(error) => {}
			)
	}, [state])

    useEffect(() => {

		if (!filters) return

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		let query = [
			'?q=' + (parameters.get('q') ? parameters.get('q') : ''), 
			'orderBy=' + (parameters.get('orderBy') ? parameters.get('orderBy') : ''),
			'page=' + (parameters.get('page') ? parseInt(parameters.get('page')) - 1 : '')
		]

		filters.forEach(filter => {
			const data = parameters.get(filter.name)
			if (data && data.length > 0)
				query.push(filter.name + '=' + data)
		})

		query = query.join('&')

		searchService.getProducts(query)
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
	}, [filters])

	return (
        <>
			<NavBar type={NavType.SEARCH}/>
			<ParamsContainer count={items.total} filters={filters} />
			<div className="flex">
				<FiltersContainer isLoading={!isLoaded} filters={filters} />
				<ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error}
				/>
			</div>
        </>
	)
}
