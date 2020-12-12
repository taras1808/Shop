import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useParams } from 'react-router-dom'


export default function EditOptionForm() {

    const { optionId } = useParams()

    const [selectedOption, setSelectedOption] = useState(null)

    const [optionsFilters, setOptionsFilters] = useState([])

    const [value, setValue] = useState("")
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        fetch(`http://192.168.0.108:7777/api/options/${optionId}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setValue(result.value)
                    setFilter(result.filter ? { value: result.filter.id, label: result.filter.title } : null)
                    setSelectedOption(result)
                },
                (error) => alert(error)
            )

        fetch("http://192.168.0.108:7777/api/filters")
            .then(res => res.json())
            .then(
                (result) => setOptionsFilters(result.map(e => ({ value: e.id, label: e.title }))),
                (error) => alert(error)
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

            {
                selectedOption ? (
                    <>
                        <p>Value</p>
                        <input value={value} type="text" onChange={e => setValue(e.target.value)} />

                        <p>Filter:</p>
                        <Select styles={SelectStyles}
                            isClearable
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
