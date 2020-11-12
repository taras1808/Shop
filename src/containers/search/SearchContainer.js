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
		if (selectedProducers.length !== 0) 
			setSelectedProducers([])
		fetch("http://192.168.0.108:7777/api/search/producers?q=" + search)
			.then(res => res.json())
			.then((result) => {
                setProducers(result)
            }, (error) => {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    
    useEffect(() => {
		let arr = ["?q=" + search]
		if (selectedProducers.length > 0) 
			arr.push('producers=' + selectedProducers)
		fetch("http://192.168.0.108:7777/api/search/prices" + arr.join('&'))
			.then(res => res.json())
			.then((result) => {
					setPriceRange(result)
					if (selectedPriceRange.length !== 0) 
						setSelectedPriceRange([])
				}, (error) => {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, selectedProducers])
    

    useEffect(() => {
		setIsLoaded(false)

		let arr = ["?q=" + search, "orderBy=" + orderBy]
		if (selectedProducers.length > 0) 
			arr.push("producers=" + selectedProducers)
		if (selectedPriceRange.length === 2) 
			arr.push("price=" + selectedPriceRange.join('-'))

		fetch("http://192.168.0.108:7777/api/search/products" + arr.join('&'))
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
