import { Collapse } from '@material-ui/core';
import { useState } from 'react';
import './Filter.css';

export default function Filter({header, items, selectedItems, setSelectedItems}) {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="filter-block">
            <div className="filter-header" onClick={() => setCollapsed(!collapsed)}>
                { header }
            </div>
            <Collapse className="collapse" in={!collapsed}>
                <ul>
                    { items.map((item, index) => (
                        <li key={index} 
                            onClick={_ => {
                                if (selectedItems.includes(item.id))
                                    setSelectedItems(selectedItems.filter(e => e !== item.id)) 
                                else
                                    setSelectedItems([...selectedItems, item.id]) 
                            }}>
                            <span className={selectedItems.includes(item.id) ? "checked" : null}></span>
                            <p>{ item.name }</p>
                        </li>
                    )) }
                </ul>
            </Collapse>

        </div>
    )
}