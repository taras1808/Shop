import './CatalogContainer.css'
import { useState, useEffect } from 'react';
import ProductsContainer from '../products/ProductsContainer.js'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import { useParams } from "react-router-dom"


export default function CatalogContainer () {

	const { categoryId, params } = useParams()

	const [state, setState] = useState(params)
	const [filters, setFilters] = useState(null)

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	const [orderBy, setOrderBy] = useState(0)

	useEffect(() => {
		if (state !== params)
			setState(params)
	}, [params])

	useEffect(() => {

		let query = []

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

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

	}, [state])

    useEffect(() => {
		setIsLoaded(false)

		if (!filters) return

		let query = []

		const parameters = state ? new Map(state.split(';').map(e => e.split('='))) : new Map()

		filters.map(filter => {
			const data = parameters.get(filter.name)
			if (data && data.length > 0)
				query.push(filter.name + '=' + data)
		})

		query = query.join('&')

		if (query.length > 0)
			query = '?' + query

		fetch('http://192.168.0.108:7777/api/categories/' +  categoryId + '/products' + query)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
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
			<SortContainer orderBy={orderBy} setOrderBy={setOrderBy}/>
			<div className="flex">
				<FiltersContainer filters={filters} />
				<ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error}
				/>
			</div>
        </>
	)
}