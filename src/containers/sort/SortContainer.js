import Select from 'react-select'
import './SortContainer.css';

const customStyles = {
    option: (provided) => ({
        ...provided,
        cursor: 'pointer'
    }),
    control: (provided) => ({
        ...provided,
        cursor: 'pointer'
    })
}

const options = [
    { value: 0, label: 'Date, new to old' },
    { value: 1, label: 'Date, old to new' },
    { value: 2, label: 'Price, low to high' },
    { value: 3, label: 'Price, high to low' },
    { value: 4, label: 'Alphabetically, A-Z' },
    { value: 5, label: 'Alphabetically, Z-A' }
]

function SortContainer ({orderBy, setOrderBy}) {

	return (
		<div id="params-container">
            <Select id="sort"
                styles={customStyles}  
                options={options} 
                defaultValue={options[orderBy]} 
                onChange={e => setOrderBy(e.value)}
            />
		</div>
	)
}

export default SortContainer;
