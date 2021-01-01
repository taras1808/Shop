import { useState, useEffect } from 'react';
import '../AdminPanelForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useHistory } from 'react-router-dom'
import { categoriesService } from '../../../../_services/categories.service'
import { filtersService } from '../../../../_services/filters.service'


export default function AddFilterForm() {

    const history = useHistory()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [url, setURL] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        categoriesService.getCategories()
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {
        filtersService.createFilter(name, url, categories)
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
