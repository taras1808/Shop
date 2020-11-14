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
                    { 
                        items.map((item, index) => (
                            <li className={item.disabled && !selectedItems.includes(item) ? "disabled" : null} key={index} 
                                onClick={_ => {
                                    if (item.disabled && !selectedItems.includes(item)) return
                                    if (selectedItems.includes(item))
                                        setSelectedItems(selectedItems.filter(e => e.id !== item.id)) 
                                    else
                                        setSelectedItems([...selectedItems, item]) 
                                }}>
                                <span className={selectedItems.includes(item) ? "checked" : null}></span>
                                <p>{ item.name } <span>({ item.count })</span></p>
                            </li>
                        )) 
                    }
                </ul>
            </Collapse>

        </div>
    )
}