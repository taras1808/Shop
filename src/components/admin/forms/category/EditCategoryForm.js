import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'


export default function EditCategoryForm() {

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [oldImage, setOldImage] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedEditCategory, setSelectedEditCategory] = useState(null)


    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        const formData = new FormData()
        if (image) formData.append('file', image)
        if (oldImage) formData.append('image', oldImage)
        formData.append('name', name)
        if (selectedCategory) formData.append('parent', selectedCategory.id)

        fetch('http://192.168.0.108:7777/api/categories/' + selectedEditCategory.id + '/', {
            method: 'PUT',
            body: formData
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                const arr = optionsCategories.filter(e => e.value !== result.id)
                const updated = {...result, value: result.id, label: result.name }
                setImage(null)
                setOldImage(result.image)
                setOptionsCategories([...arr, updated])
                setSelectedEditCategory(updated)
            },
            (error) => console.log(error)
        )
    }

    return (
        <div className="product-form">
            <h2>Edit category</h2>

            <Select styles={SelectStyles} 
                options={optionsCategories}
                value={selectedEditCategory}
                onChange={e => {
                    setName(e.name)
                    setOldImage(e.image)
                    setSelectedCategory(optionsCategories.filter(c => c.id === e.parent_id)[0])
                    setSelectedEditCategory(e)
                }} />


            { 
                selectedEditCategory ? (
                    <>
                        <p>Name</p>
                        <input value={name} type="text" onChange={e => setName(e.target.value)} />

                        <p>Root category</p>
                        <Select styles={SelectStyles} 
                            isClearable
                            options={optionsCategories.filter(e => e.id !== selectedEditCategory.id)}
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e)} />

                        <div className="submit" onClick={onSubmit}>Save category</div>

                        <p>New Image</p>

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

                        <p>Old Image</p>

                        {
                            oldImage ? (
                                <div className="images-section">
                                    <div className="image-section">

                                        <p>
                                            <span className="close" onClick={() => {
                                                setOldImage(null)
                                            }}>Remove</span>
                                        </p>

                                        <div className="image-block">
                                            <img src={oldImage} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </>
                ) : null 
            }
        </div>
    );
}
