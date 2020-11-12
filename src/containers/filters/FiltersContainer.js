import { useState, useEffect } from 'react';
import RangeFilter from '../../components/filters/RangeFilter';
import ItemsFilter from '../../components/filters/ItemsFilter';
import './FiltersContainer.css';
import { useParams } from "react-router-dom"

// export const FilterType = Object.freeze({
//     SELECT: 0,
//     SLIDER: 1
// });

function FiltersContainer ({items: {selectedProducers, selectedPriceRange}}) {

	let { categoryId } = useParams()

    const [producers, setProducers] = useState([])
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0})

    useEffect(() => {
		if (selectedProducers.value.length !== 0) 
			selectedProducers.setProducers([])
		fetch("http://192.168.0.108:7777/api/categories/" +  categoryId + "/producers")
			.then(res => res.json())
			.then((result) => setProducers(result), (error) => {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId])
    
    useEffect(() => {
		let arr = []
		if (selectedProducers.value.length > 0) 
			arr.push('producers=' + selectedProducers.value)

		fetch("http://192.168.0.108:7777/api/categories/" +  categoryId + "/prices?" + arr.join('&'))
			.then(res => res.json())
			.then((result) => {
					setPriceRange(result)
					if (selectedPriceRange.value.length !== 0) 
						selectedPriceRange.setPriceRange([])
				}, (error) => {})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, selectedProducers.value])

    return (
        <div id="filters-block">
			<ItemsFilter header="Producer" 
				items={producers} 
				selectedItems={selectedProducers.value} 
				setSelectedItems={selectedProducers.setProducers}/>

			<RangeFilter header="Price" 
				priceRange={priceRange} 
				selectedRange={selectedPriceRange.value} 
				setSelectedRange={selectedPriceRange.setPriceRange}/>
        </div>
    );
}

export default FiltersContainer;
