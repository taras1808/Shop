import './CatalogContainer.css'
import { useState, useEffect } from 'react';
import ProductsContainer from '../products/ProductsContainer.js'
import FiltersContainer from '../filters/FiltersContainer.js'
import SortContainer from '../sort/SortContainer.js'
import { useParams, useRouteMatch, useHistory } from "react-router-dom"

export default function CatalogContainer () {

	const history = useHistory();
	
	const { categoryId } = useParams()

    const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])

	let match = useRouteMatch('/:categoryId/:parameters?')

	let parameters = match.params.parameters ? 
		new Map(match.params.parameters.split(';').map(e => e.split('=')))
		: new Map()

	let historyProducers = parameters.get('producers')
	let historyPrice = parameters.get('price')

	const [producers, setProducers] = useState([])
	const [priceRange, setPriceRange] = useState({ min: null, max: null})
    const [orderBy, setOrderBy] = useState(0)
    
    const [selectedProducers, setSelectedProducers] = useState(historyProducers ? historyProducers.split(',').map(e => parseInt(e)) : [])
	const [selectedPriceRange, setSelectedPriceRange] = useState(historyPrice ? historyPrice.split('-').map(e => parseInt(e)) : [])

	useEffect(() => {
		let query = []
		if (selectedPriceRange.length === 2) 
			query.push('?price=' + selectedPriceRange.join('-'))

		fetch('http://192.168.0.108:7777/api/categories/' +  categoryId + '/producers' + query)
			.then(res => res.json())
			.then((result) => {
				result = result.filter(e => e.hasProducts !== '0')
				result.forEach(e => {
					e.disabled = e.count === '0'
				})
				setProducers(result)
				if (producers.length === 0) {
					let pricesMin
					let pricesMax

					if (selectedProducers.length > 0) {
						pricesMin = result.filter(e => selectedProducers.includes(e.id)).map(({min}) => parseInt(min))
						pricesMax = result.filter(e => selectedProducers.includes(e.id)).map(({max}) => parseInt(max))
					} else {
						pricesMin = result.map(({min}) => parseInt(min))
						pricesMax = result.map(({max}) => parseInt(max))
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
			}, (error) => {})
	}, [categoryId, selectedPriceRange])

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

		console.log({pricesMin, pricesMax})

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

		let parameters = match.params.parameters ? 
        	new Map(match.params.parameters.split(';').map(e => e.split('=')))
			: new Map()

		if (selectedPriceRange.join('-') === parameters.get('price')) return
	 if (selectedPriceRange.length === 0) return

		parameters.set('price', selectedPriceRange.join('-'))

		parameters = Array.from(parameters)
			.filter(e => e[1].length > 0)
			.map(e => e.join('='))
			.join(';')

		parameters = parameters !== '' ? parameters + '/' : ''

		history.push(`/${match.params.categoryId}/${parameters}`)

	}, [selectedPriceRange])
	
	useEffect(() => {

		if (producers.length === 0) return


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

		let parameters = match.params.parameters ? 
        	new Map(match.params.parameters.split(';').map(e => e.split('=')))
			: new Map()

		if (selectedProducers.join(',') === historyProducers) return
		if (selectedProducers.length === 0) return

		parameters.set('producers', selectedProducers)

		parameters = Array.from(parameters)
			.filter(e => e[1].length > 0)
			.map(e => e.join('='))
			.join(';')

		parameters = parameters !== '' ? parameters + '/' : ''

		console.log(`/${match.params.categoryId}/${parameters}`)

		history.push(`/${match.params.categoryId}/${parameters}`)

    }, [selectedProducers])

    useEffect(() => {
		setIsLoaded(false)

		let query = ['?orderBy=' + orderBy]
		if (selectedProducers.length > 0) 
			query.push('producers=' + selectedProducers)
		if (selectedPriceRange.length === 2) 
			query.push('price=' + selectedPriceRange.join('-'))

		fetch('http://192.168.0.108:7777/api/categories/' +  categoryId + '/products' + query.join('&'))
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
	}, [selectedProducers, selectedPriceRange, orderBy])
    
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
