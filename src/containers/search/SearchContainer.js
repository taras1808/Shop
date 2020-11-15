import './SearchContainer.css'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import ProductsContainer from '../products/ProductsContainer.js'
import { useState, useEffect } from 'react';
import { useParams, useRouteMatch, useHistory } from "react-router-dom"

export default function SearchContainer () {

	const history = useHistory();

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	let match = useRouteMatch('/search/:parameters')

	let parameters = match.params.parameters ? 
		new Map(match.params.parameters.split(';').map(e => e.split('=')))
		: new Map()

	let historySearch = parameters.get('q')
	let historyProducers = parameters.get('producers')
	let historyPrice = parameters.get('price')

	const [producers, setProducers] = useState([])
	const [priceRange, setPriceRange] = useState({ min: null, max: null})
    const [orderBy, setOrderBy] = useState(0)
    
    const [selectedProducers, setSelectedProducers] = useState(historyProducers ? historyProducers.split(',').map(e => parseInt(e)) : [])
	const [selectedPriceRange, setSelectedPriceRange] = useState(historyPrice ? historyPrice.split('-').map(e => parseInt(e)) : [])

	useEffect(() => {
		let query = ['?q=' + historySearch]
		if (selectedPriceRange.length === 2) 
			query.push('price=' + selectedPriceRange.join('-'))

		fetch('http://192.168.0.108:7777/api/search/producers' + query.join('&'))
			.then(res => res.json())
			.then((result) => {
				result.forEach(e => {
					e.disabled = e.count === '0'
				})
				setProducers(result)
				if (producers.length === 0) {
					setPriceRangeFunc(result, selectedProducers, selectedPriceRange, setPriceRange)
				}
			}, (error) => {})

	}, [historySearch])

	useEffect(() => {
		if (!historyProducers) {
			setSelectedProducers([])
			return
		}
		if (selectedProducers.join(',') !== historyProducers)
			setSelectedProducers(historyProducers ? historyProducers.split(',').map(e => parseInt(e)) : []);
	  }, [historyProducers]);

	useEffect(() => {
		if (!historyPrice) {
			setSelectedPriceRange([])
			return
		}
		if (selectedPriceRange.join('-') !== historyPrice)
			setSelectedPriceRange(historyPrice ? historyPrice.split('-').map(e => parseInt(e)) : []);
	}, [historyPrice]);

    useEffect(() => {

		if (producers.length === 0) return

		setPriceRangeFunc(producers, selectedProducers, selectedPriceRange, setPriceRange)

		let parameters = match.params.parameters ? 
        	new Map(match.params.parameters.split(';').map(e => e.split('=')))
			: new Map()

		if (selectedPriceRange.join('-') === parameters.get('price')) return

		parameters.set('price', selectedPriceRange.join('-'))

		parameters = Array.from(parameters)
			.filter(e => e[1].length > 0 || e[0] === 'q')
			.map(e => e.join('='))
			.join(';')

		parameters = parameters !== '' ? parameters + '/' : ''

		history.push(`/search/${parameters}`)

	}, [selectedPriceRange])
	
	useEffect(() => {

		if (producers.length === 0) return

		setPriceRangeFunc(producers, selectedProducers, selectedPriceRange, setPriceRange)

		let parameters = match.params.parameters ? 
        	new Map(match.params.parameters.split(';').map(e => e.split('=')))
			: new Map()

		if (selectedProducers.join(',') === historyProducers) return

		parameters.set('producers', selectedProducers)

		parameters = Array.from(parameters)
			.filter(e => e[1].length > 0 || e[0] === 'q')
			.map(e => e.join('='))
			.join(';')

		parameters = parameters !== '' ? parameters + '/' : ''

		history.push(`/search/${parameters}`)

	}, [selectedProducers])
    
    useEffect(() => {
		setIsLoaded(false)

		let query = ["?q=" + historySearch, "orderBy=" + orderBy]
		if (selectedProducers.length > 0) 
			query.push("producers=" + selectedProducers)
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
    }, [historySearch, selectedProducers, selectedPriceRange, orderBy])
    
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

function setPriceRangeFunc(producers, selectedProducers, selectedPriceRange, setPriceRange) {

	let pricesMin
	let pricesMax

	if (selectedProducers.length > 0) {
		pricesMin = producers.filter(e => selectedProducers.includes(e.id)).map(({min}) => parseInt(min))
		pricesMax = producers.filter(e => selectedProducers.includes(e.id)).map(({max}) => parseInt(max))
	} else {
		pricesMin = producers.map(({min}) => parseInt(min))
		pricesMax = producers.map(({max}) => parseInt(max))
	}

	pricesMin = Math.min(...pricesMin)
	pricesMax = Math.max(...pricesMax)

	if (selectedPriceRange.length === 0) {
		setPriceRange({
			max: pricesMax,
			min: pricesMin
		})
	} else {
		setPriceRange({
			max: selectedPriceRange[1] > pricesMax ? selectedPriceRange[1] : pricesMax,
			min: selectedPriceRange[0] < pricesMin ? selectedPriceRange[0] : pricesMin
		})
	}
}

