import { useState, useEffect } from 'react';
import '../AdminPanelForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import SelectImageBlock from '../block/images/SelectImageBlock'
import { useHistory } from 'react-router-dom'


export default function AddCategoryForm() {

    const history = useHistory()

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(
                    result.map(e => ({ ...e, value: e.id, label: e.name }))
                ),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        const formData = new FormData()
        if (image) formData.append('file', image)
        formData.append('name', name)
        if (selectedCategory) formData.append('parent', selectedCategory.id)

        fetch("http://192.168.0.108:7777/api/categories", {
            method: 'POST',
            body: formData
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                history.push(`/admin/categories/${result.id}/`)
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">New category</h2>

            <p className="admin-panel">Name</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />


            <p className="admin-panel">Root category</p>
            <Select styles={SelectStyles} 
                isClearable
                options={optionsCategories}
                value={selectedCategory}
                onChange={e => setSelectedCategory(e)} />

            <SelectImageBlock {...{image, setImage}} />

            <div className="submit" onClick={onSubmit}>Save category</div>

        </div>
    );
}
