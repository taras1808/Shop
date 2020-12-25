import { useState, useEffect } from 'react';
import '../AdminPanelForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useHistory } from 'react-router-dom'


export default function AddFilterForm() {

    const history = useHistory()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [url, setURL] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        fetch("http://192.168.0.108:7777/api/filters", {
            method: 'POST',
            body: JSON.stringify({
                title: name,
                name: url,
                categories: categories ? categories.map(e => e.id) : []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                history.push(`/admin/filters/${result.id}/`)
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">New filter</h2>

            <p className="admin-panel">Nazwa</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />

            <p className="admin-panel">URL</p>
            <input value={url} type="text" onChange={e => setURL(e.target.value.toLowerCase())} />

            <p className="admin-panel">Kategorii:</p>
            <Select styles={SelectStyles}
                isClearable
                isMulti
                value={categories}
                options={optionsCategories} 
                onChange={e => setCategories(e)} />

            <div className="submit" onClick={onSubmit}>Save filter</div>
        </div>
    );
}
