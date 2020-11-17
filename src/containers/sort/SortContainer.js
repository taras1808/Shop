import Select from 'react-select'
import './SortContainer.css';
import { useParams, useHistory } from "react-router-dom"

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

function SortContainer () {

    const history = useHistory();

    const { categoryId, params } = useParams()

    let parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	return (
		<div id="params-container">
            <Select id="sort"
                isSearchable={false}
                styles={customStyles}  
                options={options} 
                defaultValue={options[0]} 
                onChange={e => {

                    parameters.set('orderBy', `${e.value}`)

                    let params = Array.from(parameters)
                        .filter(e => e[1].length > 0)
                        .map(e => e.join('='))
                        .join(';')

                    history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
                }}
            />
		</div>
	)
}

export default SortContainer;
