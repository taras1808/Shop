import './CatalogContainer.css'
import { useState, useEffect } from 'react';
import ProductsContainer from '../products/ProductsContainer.js'
import FiltersContainer from '../filters/FiltersContainer.js'
import ParamsContainer from '../params/ParamsContainer.js'
import { useParams } from 'react-router-dom'


export default function CatalogContainer () {

	const { categoryId, params } = useParams()

	const [state, setState] = useState(params)
	const [filters, setFilters] = useState(null)

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useEffect(() => {
		if (state !== params) {
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

		fetch('http://192.168.0.108:7777/api/categories/' +  categoryId + '/fitlers' + query)
			.then(res => res.json())
			.then((result) => {
				setFilters(result)
			}, (error) => {})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state])

    useEffect(() => {

		if (!filters) return

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		let query = [
			`?orderBy=${parameters.get('orderBy') ? parameters.get('orderBy') : ''}`, 
			`page=${parameters.get('page') ? parseInt(parameters.get('page')) - 1 : ''}`
		]

		filters.forEach(filter => {
			const data = parameters.get(filter.name)
			if (data && data.length > 0)
				query.push(filter.name + '=' + data)
		})

		query = query.join('&')

		fetch('http://192.168.0.108:7777/api/categories/' +  categoryId + '/products' + query)
			.then(res => res.json())
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
			<ParamsContainer filters={filters} />
			<div className="flex">
				<FiltersContainer isLoading={!isLoaded} filters={filters} />
				<ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error} />
			</div>
        </>
	)
}