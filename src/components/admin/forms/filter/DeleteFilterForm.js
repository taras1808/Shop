import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'


export default function DeleteFilterForm() {

    const [optionsFilters, setOptionsFilters] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])

    const [categories, setCategories] = useState([])

    const [selectedFilter, setSelectedFilter] = useState(null)

    useEffect(() => {

        fetch("http://192.168.0.108:7777/api/filters")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsFilters(result.map(e => {
                        delete e['options']
                        return { ...e, value: e.id, label: e.title }
                    }))
                },
                (error) => {}
            )

        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        fetch('http://192.168.0.108:7777/api/filters/' + selectedFilter.id + '/', {
            method: 'DELETE'
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                const arr = optionsFilters.filter(e => e.value !== selectedFilter.id)
                setOptionsFilters(arr)
                setSelectedFilter(null)
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="product-form">
            <h2>Delete filter</h2>

            <Select 
                styles={SelectStyles} 
                options={optionsFilters}
                value={selectedFilter}
                onChange={e => {
                    setCategories(e.categories.map(e => ({ value: e.id, label: e.name })))
                    setSelectedFilter(e)
                }}
            />

            {
                selectedFilter ? (
                    <>
                        <p>Nazwa</p>
                        <span> { selectedFilter.title } </span>

                        <p>URL</p>
                        <span> { selectedFilter.name } </span>

                        <p>Kategorii:</p>
                        <Select styles={SelectStyles}
                            isMulti
                            isDisabled
                            value={categories}
                            options={optionsCategories} 
                            onChange={e => setCategories(e)} />

                        <div className="submit" onClick={onSubmit}>Delete filter</div>
                    </>
                ) : null
            }

        </div>
    );
}
