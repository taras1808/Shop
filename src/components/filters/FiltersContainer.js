import RangeFilter from '../../components/filters/RangeFilter';
import ItemsFilter from '../../components/filters/ItemsFilter';
import './FiltersContainer.css';


export const FilterType = Object.freeze({
    SELECT: 0,
    SLIDER: 1
});

export default function FiltersContainer ({isLoading, filters}) {

    return (
        <div id="filters-block" className={isLoading && "preload"}>
			{
				filters && filters.map((filter, index) => {
					switch (filter.type) {
						case FilterType.SELECT:
							return (<ItemsFilter key={index} filter={filter} />)
						case FilterType.SLIDER:
							return (<RangeFilter key={index} filter={filter} />)
						default:
							return null
					}
				})
			}
        </div>
    );
}
