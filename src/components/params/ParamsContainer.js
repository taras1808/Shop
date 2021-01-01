import Select from 'react-select'
import './ParamsContainer.css'
import { useParams, useHistory, Link } from 'react-router-dom'
import { FilterType } from '../filters/FiltersContainer'
import { SelectStyles } from '../../components/styles/CustomStyle'
import { buildLink, buildLinkRange } from '../../_utils/params-utils'


const options = [
    { value: 0, label: 'Date, new to old' },
    { value: 1, label: 'Date, old to new' },
    { value: 2, label: 'Price, low to high' },
    { value: 3, label: 'Price, high to low' },
    { value: 4, label: 'Alphabetically, A-Z' },
    { value: 5, label: 'Alphabetically, Z-A' }
]

export default function ParamsContainer ({ filters }) {

    const history = useHistory()

    const { categoryId, params } = useParams()

    let parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

	return (
		<div id="params-container">
            <div id="params-block">

                {
                    filters && filters.map(filter => {
                        let values = parameters.get(filter.name)
                        if (!values) return null


                        switch (filter.type) {
                            case FilterType.SELECT:
                                values = values.split(',').map(e => parseInt(e))

                                return filter.options.filter(e => values.includes(e.id)).map((e, index) => (
                                    <Link key={e.id} className="param-block" {...buildLink(params, categoryId, filter, e)}>{ e.value }</Link>
                                ))
                            case FilterType.SLIDER:
                                return <Link key={filter.name} className="param-block" {...buildLinkRange(params, categoryId, filter)}>{ values }</Link>
                            default:
                                return null
                        }
                        
                    })
                }
            </div>

            <Select id="sort"
                isSearchable={false}
                styles={SelectStyles}  
                options={options} 
                defaultValue={options[parameters.get('orderBy') ? parseInt(parameters.get('orderBy')) : 0]} 
                onChange={e => {

                    parameters.set('orderBy', `${e.value}`)
                    parameters.set('page',  0)

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
