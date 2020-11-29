import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'


export default function EditOptionForm() {

    const [selectedOption, setSelectedOption] = useState(null)
    const [optionsOptions, setOptionsOptions] = useState([])

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/options/")
            .then(res => res.json())
            .then(
                (result) => setOptionsOptions(result.map(e => ({ ...e, value: e.id, label: e.value }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        fetch("http://192.168.0.108:7777/api/options/" + selectedOption.id + '/', {
            method: 'DELETE'
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                const arr = optionsOptions.filter(e => e.value !== selectedOption.id)
                setOptionsOptions(arr)
                setSelectedOption(null)
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="product-form">
            <h2>Delete option</h2>

            <Select styles={SelectStyles}
                value={selectedOption}
                options={optionsOptions} 
                onChange={e => {
                    setSelectedOption(e)
                }} />

            {
                selectedOption ? (
                    <>
                        <p>Value</p>
                        <span> { selectedOption.label } </span>

                        <p>Filter:</p>
                        <span> { selectedOption.filter ? selectedOption.filter.title : null } </span>

                        <div className="submit" onClick={onSubmit}>Delete option</div>
                    </>
                ) : null
            }
                

        </div>
    );
}
