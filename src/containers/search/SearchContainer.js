import './SearchContainer.css'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import ProductsContainer from '../products/ProductsContainer.js'
import { useState, useEffect } from 'react';

export default function SearchContainer ({ search }) {

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	const [producers, setProducers] = useState([])
	const [priceRange, setPriceRange] = useState({ min: 0, max: 0})
    const [orderBy, setOrderBy] = useState(0)
    
    const [selectedProducers, setSelectedProducers] = useState([])
    const [selectedPriceRange, setSelectedPriceRange] = useState([])
	
	useEffect(() => {
		setSelectedProducers([])
		setSelectedPriceRange([])
		fetch('http://192.168.0.108:7777/api/search/producers?q=' + search)
			.then(res => res.json())
			.then((result) => {
				result = result.filter(e => parseInt(e.count) !== 0)
				const pricesMin = result.map(({min}) => min)
				const pricesMax = result.map(({max}) => max)
				setProducers(result)
				setPriceRange({
					max: Math.max(...pricesMax),
					min: Math.min(...pricesMin)
				})
			}, (error) => {})
    }, [search])

    useEffect(() => {
		if (selectedPriceRange.length < 2) return
		let query = ['?q=' + search,'orderBy=' + orderBy]
		if (selectedProducers.length > 0) 
			query.push('producers=' + selectedProducers.map(e => e.id))
		if (selectedPriceRange.length === 2) 
			query.push('price=' + selectedPriceRange.join('-'))
		fetch('http://192.168.0.108:7777/api/search/producers' + query.join('&'))
			.then(res => res.json())
			.then((result) => {
				console.log(result)
				producers.forEach(e1 => {
					const filtered = result.filter(e2 => e1.id === e2.id)
					if (filtered.length === 0) {
						e1.count = 0
						e1.disabled = true
					} else {
						e1.count = filtered[0].count
						e1.disabled = false
					}
				})
				setProducers([...producers])
			}, (error) => {})
	}, [selectedPriceRange])
	
	useEffect(() => {
		if (producers.length === 0) return
		if (selectedProducers.length > 0) {
			if (selectedPriceRange.length !== 0) return
			const pricesMin = selectedProducers.map(({min}) => min)
			const pricesMax = selectedProducers.map(({max}) => max)
			setPriceRange({
				max: Math.max(...pricesMax),
				min: Math.min(...pricesMin)
			})
		} else {
			const pricesMin = producers.map(({min}) => min)
			const pricesMax = producers.map(({max}) => max)
			setPriceRange({
				max: Math.max(...pricesMax),
				min: Math.min(...pricesMin)
			})
		}
    }, [selectedProducers])
    
    useEffect(() => {
		setIsLoaded(false)

		let query = ["?q=" + search, "orderBy=" + orderBy]
		if (selectedProducers.length > 0) 
			query.push("producers=" + selectedProducers.map(e => e.id))
		if (selectedPriceRange.length === 2) 
			query.push("price=" + selectedPriceRange.join('-'))

		fetch("http://192.168.0.108:7777/api/search/products" + query.join('&'))
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
    }, [search, selectedProducers, selectedPriceRange, orderBy])
    
	return (
        <>
			<SortContainer orderBy={orderBy} setOrderBy={setOrderBy}/>
			<div className="flex">
				<FiltersContainer 
					items={{
						producers: {
							items: producers,
							selectedProducers,
							setSelectedProducers
						},
						priceRange: {
							items: priceRange,
							selectedPriceRange,
							setSelectedPriceRange
						}
					}}
				/>
				<ProductsContainer 
					items={items}
					isLoaded={isLoaded}
					error={error}
				/>
			</div>
        </>
	)
}
