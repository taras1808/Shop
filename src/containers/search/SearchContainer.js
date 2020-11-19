import './SearchContainer.css'
import FiltersContainer from '../filters/FiltersContainer.js'
import ParamsContainer from '../params/ParamsContainer.js'
import ProductsContainer from '../products/ProductsContainer.js'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"

export default function SearchContainer () {

    const { params } = useParams()

	const [state, setState] = useState(params)
	const [filters, setFilters] = useState(null)

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	useEffect(() => {
		if (state !== params)
			setState(params)
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

		fetch('http://192.168.0.108:7777/api/search/filters' + query)
			.then(res => res.json())
			.then((result) => {
				setFilters(result)
			}, (error) => {})

	}, [state])

    useEffect(() => {

		if (!filters) return

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		let query = [
			'?q=' + (parameters.get('q') ? parameters.get('q') : ''), 
			'orderBy=' + (parameters.get('orderBy') ? parameters.get('orderBy') : '')
		]

		filters.map(filter => {
			const data = parameters.get(filter.name)
			if (data && data.length > 0)
				query.push(filter.name + '=' + data)
		})

		query = query.join('&')

		fetch('http://192.168.0.108:7777/api/search/products' + query)
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
	}, [filters])

	return (
        <>
			<ParamsContainer filters={filters} />
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
