import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'


export default function AddCategoryForm() {

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
            (result) => alert("OK"),
            (error) => alert(error)
        )
    }

    return (
        <div className="admin-panel-form">
            <h2>New category</h2>

            <p>Name</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />


            <p>Root category</p>
            <Select styles={SelectStyles} 
                isClearable
                options={optionsCategories}
                value={selectedCategory}
                onChange={e => setSelectedCategory(e)} />

            <div className="submit" onClick={onSubmit}>Save category</div>

            <p>Image</p>

            <label className="select-image">
                Select image...
                <input type="file"
                    accept="image/png, image/jpeg" 
                    onChange={e => {
                        setImage(e.target.files[0])
                        e.target.value = ''
                    }} />
            </label>

            {
                image ? (
                    <div className="images-section">
                        <div className="image-section">

                            <p>Name:
                                <span className="close" onClick={() => {
                                    setImage(null)
                                }}>Remove</span>
                            </p>
                            <span>{image.name} </span>

                            <p>Size:</p>
                            <span>{(image.size / 1024).toFixed(2)} KB</span>

                            <div className="image-block">
                                <img src={URL.createObjectURL(image) } alt=""/>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </div>
    );
}
