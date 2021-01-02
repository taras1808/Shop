import { Collapse } from '@material-ui/core'
import { useState } from 'react'
import './Filter.css'
import { useParams, Link } from'react-router-dom'
import { buildLink } from '../../_utils/params-utils'


export default function ItemsFilter({filter}) {

    const { categoryId, params } = useParams()

    const parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

    const array = parameters.get(filter.name) ? parameters.get(filter.name).split(',').map(e => parseInt(e)) : []

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
                            <Link {...buildLink(params, categoryId, filter, item)} key={index}>
                                <li className={item.products_quantity === '0' && !array.includes(item.id) ? "disabled" : null}>
                                    <span className={array.includes(item.id) ? "checked" : null}></span>
                                    <p>{ item.value } <span>({ item.products_quantity })</span></p>
                                </li>
                            </Link>
                        )) 
                    }
                </ul>
            </Collapse>

        </div>
    )
}