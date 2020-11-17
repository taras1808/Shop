import { Slider, Collapse } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './Filter.css';
import { useParams, useHistory } from "react-router-dom"


export default function RangeFilter({filter}) {

    const history = useHistory();

    const { categoryId, params } = useParams()

    let parameters = params ? new Map(params.split(';').map(e => e.split('='))) : new Map()

    let array = parameters.get(filter.name) ? parameters.get(filter.name).split('-').map(e => parseInt(e)) : null

    const [collapsed, setCollapsed] = useState(false)

    const [value, setValue] = useState(array)
    const [range, setRange] = useState({min: 0, max: 1})

    useEffect(() => {
        if (!filter) return
        const min = Math.floor(parseFloat(!array || filter.range.min < array[0] ? filter.range.min : array[0]))
        const max = Math.ceil(parseFloat(!array || filter.range.max > array[1] ? filter.range.max : array[1]))
        setRange({min, max})

        if (!array)
            setValue([min, max])
    }, [filter])

    return (
        <div className="filter-block">

            <div className="filter-header" onClick={() => setCollapsed(!collapsed)}>
                { filter.title }
            </div>

            <Collapse className="collapse" in={!collapsed}>
                <div className="slider-info">

                    { 
                        value ? ( 
                            <>
                                <input type="text" value={value[0]} onChange={(e) => setValue([e.target.value, value[1]])} />
                                <input type="text" value={value[1]} onChange={(e) => setValue([value[0], e.target.value])} />
                                <button onClick={_ => {
                                    parameters.set(filter.name, value.join('-'))

                                    let params = Array.from(parameters)
                                        .filter(e => e[1].length > 0)
                                        .map(e => e.join('='))
                                        .join(';')

                                    history.push(`/${categoryId ? `catalog/${categoryId}` : 'search'}/${params !== '' ? params + '/' : ''}`)
                                }}>OK</button>
                            </>
                        ) : null 
                    }
                </div>
                <div className="slider-block">
                    { 
                        value ? ( 
                            <Slider
                                value={range.min === range.max ? [0, 1] : value}
                                disabled={range.min === range.max}
                                min={range.min === range.max ? 0 : Math.floor(parseFloat(range.min))}
                                max={range.min === range.max ? 1 : Math.ceil(parseFloat(range.max))}
                                onChange={(_, value) => setValue(value)}
                                aria-labelledby="track-false-slider"
                            />
                        ) : null
                    }
                </div>
            </Collapse>

        </div>
    )
}