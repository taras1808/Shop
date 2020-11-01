
import { Filter, FilterType } from '../../components/filter/Filter';
import './FiltersContainer.css';

function FiltersContainer () {

    const producers = [
        { name: "Castrol" }, 
        { name: "General Motors (GM)" }, 
        { name: "FORD" }
    ]

    return (
        <div id="filters-block">
            <Filter header="Producer" items={producers} type={FilterType.SELECT}/>
            <Filter header="Price" type={FilterType.SLIDER}/>
        </div>
    );

}

export default FiltersContainer;
