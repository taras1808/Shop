import Select from 'react-select'
import './ParamsContainer.css';
import { useParams, useHistory } from "react-router-dom"
import { FilterType } from '../filters/FiltersContainer'

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

export default function ParamsContainer ({ filters }) {

    const history = useHistory();

    const { categoryId, params } = useParams()

    let parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	return (
		<div id="params-container">
            <div id="params-block">

                {
                    filters ? filters.map(filter => {
                        let values = parameters.get(filter.name)
                        if (!values) return null


                        switch (filter.type) {
                            case FilterType.SELECT:
                                values = values.split(',').map(e => parseInt(e))

                                return filter.options.filter(e => values.includes(e.id)).map(e => (
                                    <div key={e.id} className="param-block" onClick={_ => {
                                        parameters.set(filter.name, values.filter(value => value !== e.id))

                                        let params = Array.from(parameters)
                                            .filter(e => e[1].length > 0)
                                            .map(e => e.join('='))
                                            .join(';')

                                        history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
                                    }}>{ e.value }</div>
                                ))
                            case FilterType.SLIDER:
                                    return <div key={filter.name} className="param-block" onClick={_ => {

                                        parameters.set(filter.name, '')

                                        let params = Array.from(parameters)
                                            .filter(e => e[1].length > 0)
                                            .map(e => e.join('='))
                                            .join(';')

                                        history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)

                                    }}>{ values }</div>
                                break
                        }
                        
                    }) : null
                    
                }

            </div>

            <Select id="sort"
                isSearchable={false}
                styles={customStyles}  
                options={options} 
                defaultValue={options[parameters.get('orderBy') ? parseInt(parameters.get('orderBy')) : 0]} 
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
