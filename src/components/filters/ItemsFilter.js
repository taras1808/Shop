import { Collapse } from '@material-ui/core'
import { useState } from 'react'
import './Filter.css'
import { useParams, useHistory } from'react-router-dom'


export default function ItemsFilter({filter}) {

    const history = useHistory()

    const { categoryId, params } = useParams()

    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

    let array = parameters.get(filter.name) ? parameters.get(filter.name).split(',').map(e => parseInt(e)) : []

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="filter-block">
            <div className="filter-header" onClick={() => setCollapsed(!collapsed)}>
                { filter.title }
            </div>
            <Collapse className="collapse" in={!collapsed}>
                <ul>
                    { 
                        filter.options.map((item, index) => (
                            <li key={index} 
                                className={item.products_quantity === '0' && !array.includes(item.id) ? "disabled" : null} 
                                onClick={_ => {

                                    if (item.products_quantity === '0' && !array.includes(item.id)) return

                                    if (array.includes(item.id)) {
                                        array = array.filter(e => e !== item.id)
                                    } else {
                                        array = [...array, item.id]
                                    }

                                    parameters.set(filter.name, array)
                                    parameters.set('page',  0)

                                    let params = Array.from(parameters)
                                        .filter(e => `${e[1]}`.length > 0)
                                        .map(e => e.join('='))
                                        .join(';')

                                    history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
                                }}>
                                <span className={array.includes(item.id) ? "checked" : null}></span>
                                <p>{ item.value } <span>({ item.products_quantity })</span></p>
                            </li>
                        )) 
                    }
                </ul>
            </Collapse>

        </div>
    )
}