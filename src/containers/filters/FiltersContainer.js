import RangeFilter from '../../components/filters/RangeFilter';
import ItemsFilter from '../../components/filters/ItemsFilter';
import './FiltersContainer.css';


export const FilterType = Object.freeze({
    SELECT: 0,
    SLIDER: 1
});

function FiltersContainer ({filters}) {

    return (
        <div id="filters-block">

			{
				filters ? filters.map((filter, index) => {
					switch (filter.type) {
						case FilterType.SELECT:
							return (<ItemsFilter key={index} filter={filter} />)
						case FilterType.SLIDER:
							return (<RangeFilter key={index} filter={filter} />)
							break
						default:
							(<></>)
							break
					}
				}) : null
			}
        </div>
    );
}

export default FiltersContainer;
