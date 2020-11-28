import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { FilterType } from '../../../../containers/filters/FiltersContainer'


export default function EditOptionForm() {

    const [selectedOption, setSelectedOption] = useState(null)

    const [optionsOptions, setOptionsOptions] = useState([])

    const [optionsFilters, setOptionsFilters] = useState([])

    const [value, setValue] = useState("")
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/options")
            .then(res => res.json())
            .then(
                (result) => setOptionsOptions(result.map(e => ({ ...e, value: e.id, label: e.value }))),
                (error) => {}
            )

        fetch("http://192.168.0.108:7777/api/filters")
            .then(res => res.json())
            .then(
                (result) => setOptionsFilters(result.map(e => ({ value: e.id, label: e.title }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        fetch('http://192.168.0.108:7777/api/options/' + selectedOption.id + '/', {
            method: 'PUT',
            body: JSON.stringify({
                value,
                filter: filter ? filter.value : null
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(
            (result) => alert("OK"),
            (error) => alert(error)
        )
    }

    return (
        <div className="product-form">
            <h2>Edit option</h2>

            <Select styles={SelectStyles}
                value={selectedOption}
                options={optionsOptions} 
                onChange={e => {
                    setValue(e.label)
                    setFilter(e.filter ? { value: e.filter.id, label: e.filter.title } : null)
                    setSelectedOption(e)
                }} />

            {
                selectedOption ? (
                    <>
                        <p>Value</p>
                        <input value={value} type="text" onChange={e => setValue(e.target.value)} />

                        <p>Filter:</p>
                        <Select styles={SelectStyles}
                            value={filter}
                            options={optionsFilters} 
                            onChange={e => setFilter(e)} />

                        <div className="submit" onClick={onSubmit}>Save option</div>
                    </>
                ) : null
            }
        </div>
    );
}
