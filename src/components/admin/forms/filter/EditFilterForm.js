import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useParams } from 'react-router-dom'


export default function EditFilterForm() {

    const { filterId } = useParams()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [url, setURL] = useState("")
    const [categories, setCategories] = useState([])

    const [selectedFilter, setSelectedFilter] = useState(null)

    useEffect(() => {

        fetch(`http://192.168.0.108:7777/api/filters/${filterId}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.title)
                    setURL(result.name)
                    setCategories(result.categories.map(e => ({ value: e.id, label: e.name })))
                    setSelectedFilter(result)
                },
                (error) => alert(error)
            )

        fetch('http://192.168.0.108:7777/api/categories/')
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => alert(error)
            )
    }, [])

    const onSubmit = () => {

        fetch(`http://192.168.0.108:7777/api/filters/${selectedFilter.id}/`, {
            method: 'PUT',
            body: JSON.stringify({
                title: name,
                name: url,
                categories: categories ? categories.map(e => e.value) : []
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
            <h2>Edit filter</h2>

            {
                selectedFilter ? (
                    <>
                        <p>Nazwa</p>
                        <input value={name} type="text" onChange={e => setName(e.target.value)} />

                        <p>URL</p>
                        <input value={url} type="text" onChange={e => setURL(e.target.value)} />

                        <p>Kategorii:</p>
                        <Select styles={SelectStyles}
                            isClearable
                            isMulti
                            value={categories}
                            options={optionsCategories} 
                            onChange={e => setCategories(e)} />

                        <div className="submit" onClick={onSubmit}>Save filter</div>
                    </>
                ) : null
            }

        </div>
    );
}
