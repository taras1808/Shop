import RangeFilter from '../../components/filters/RangeFilter';
import ItemsFilter from '../../components/filters/ItemsFilter';
import './FiltersContainer.css';

// export const FilterType = Object.freeze({
//     SELECT: 0,
//     SLIDER: 1
// });

function FiltersContainer ({items: {producers, priceRange}}) {

    return (
        <div id="filters-block">

			<ItemsFilter header="Producer" 
				items={producers.items} 
				selectedItems={producers.selectedProducers} 
				setSelectedItems={producers.setSelectedProducers}/>
				

			<RangeFilter header="Price" 
				priceRange={priceRange.items} 
				selectedRange={priceRange.selectedPriceRange} 
				setSelectedRange={priceRange.setSelectedPriceRange}/>
        </div>
    );
}

export default FiltersContainer;
