import { Slider, Collapse } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './Filter.css';

export default function Filter({header, priceRange, selectedRange, setSelectedRange}) {

    const [collapsed, setCollapsed] = useState(false)
    const [value, setValue] = useState([])

    useEffect(() => {
        if (priceRange) 
            setValue([
                Math.floor(parseFloat(priceRange.min)), 
                Math.ceil(parseFloat(priceRange.max))
            ])
    }, [priceRange])

    return (
        <div className="filter-block">

            <div className="filter-header" onClick={() => setCollapsed(!collapsed)}>
                { header }
            </div>

            <Collapse className="collapse" in={!collapsed}>
                <div className="slider-info">
                    <input type="text" value={value[0]} onChange={(e) => setValue([e.target.value, value[1]])} />

                    <input type="text" value={value[1]} onChange={(e) => setValue([value[0], e.target.value])} />

                    <button onClick={_ => setSelectedRange(value)}>OK</button>
                </div>
                <div className="slider-block">
                    <Slider
                        value={priceRange.min === priceRange.max ? [0, 100] : value}
                        disabled={priceRange.min === priceRange.max}
                        min={priceRange.min === priceRange.max ? 0 : Math.floor(parseFloat(priceRange.min))}
                        max={priceRange.min === priceRange.max ? 100 : Math.ceil(parseFloat(priceRange.max))}
                        onChange={(_, value) => setValue(value)}
                        aria-labelledby="track-false-slider"
                    />
                </div>
            </Collapse>

        </div>
    )
}