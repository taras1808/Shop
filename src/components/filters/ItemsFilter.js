import { Collapse } from '@material-ui/core';
import { useState } from 'react';
import './Filter.css';
// import { useRouteMatch, useHistory } from "react-router-dom"

export default function Filter({ header, items, selectedItems, setSelectedItems}) {
    const [collapsed, setCollapsed] = useState(false)

    // const history = useHistory();
    // let match = useRouteMatch('/:categoryId/:parameters?')

    // let parameters = match.params.parameters ? 
	// 	new Map(match.params.parameters.split(';').map(e => e.split('=')))
	// 	: new Map()

	// let historyProducers = parameters.get('producers') ? parameters.get('producers').split(',') : []

    return (
        <div className="filter-block">
            <div className="filter-header" onClick={() => setCollapsed(!collapsed)}>
                { header }
            </div>
            <Collapse className="collapse" in={!collapsed}>
                <ul>
                    { 
                        items.map((item, index) => (
                            <li className={item.disabled && !selectedItems.includes(item.id) ? "disabled" : null} key={index} 
                                onClick={_ => {

                                    if (item.disabled && !selectedItems.includes(item.id)) return

                                    if (selectedItems.includes(item.id)) {
                                        // parameters.set('producers', selectedItems.filter(e => e !== `${item.id}`))
                                        setSelectedItems(selectedItems.filter(e => e !== item.id)) 
                                    } else {
                                        setSelectedItems([...selectedItems, item.id])
                                        // parameters.set('producers', [...selectedItems, item.id])
                                    }

                                    // parameters = Array.from(parameters)
                                    //     .filter(e => e[1].length > 0)
                                    //     .map(e => e.join('='))
                                    //     .join(';')

                                    // parameters = parameters !== '' ? parameters + '/' : ''

                                    // history.push(`/${match.params.categoryId}/${parameters}`)
                                }}>
                                <span className={selectedItems.includes(item.id) ? "checked" : null}></span>
                                <p>{ item.name } <span>({ item.count })</span></p>
                            </li>
                        )) 
                    }
                </ul>
            </Collapse>

        </div>
    )
}