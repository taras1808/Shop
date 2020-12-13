import { useState, useEffect } from 'react'
import '../ProductForm.css'
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useParams } from 'react-router-dom'
import CategoriesTree from './tree/CategoriesTree'
import FiltersTree from './tree/FiltersTree'
import { Link, useHistory } from 'react-router-dom'


export default function EditCategoryForm() {

    const history = useHistory()

    const { categoryId } = useParams()

    const [optionsCategories, setOptionsCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [category, setCategory] = useState(null)
    const [categoryName, setCategoryName] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [oldImage, setOldImage] = useState(null)

    useEffect(() => {

        fetch(`http://192.168.0.108:7777/api/categories/${categoryId}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    setCategoryName(result.name)
                    setName(result.name)
                    setOldImage(result.image)
                    setCategory(result)
                },
                (error) => alert(error)
            )

    }, [categoryId])

    useEffect(() => {
        if (!category) return
        fetch(`http://192.168.0.108:7777/api/categories/${category.id}/roots`)
            .then(res => res.json())
            .then(
                (result) => {
                    const categories = result.map(e => ({ value: e.id, label: e.name }))
                    setOptionsCategories(categories)
                    setSelectedCategory(categories.filter(e => e.value === category.parent_id)[0])
                },
                (error) => alert(error)
            )
    }, [category])

    const onEdit = () => {

        const formData = new FormData()
        if (image) formData.append('file', image)
        if (oldImage) formData.append('image', oldImage)
        formData.append('name', name)
        if (selectedCategory) formData.append('parent', selectedCategory.value)

        fetch('http://192.168.0.108:7777/api/categories/' + categoryId + '/', {
            method: 'PUT',
            body: formData
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert("OK")
                setImage(null)
                setCategoryName(name)
                setOldImage(result.image)
            },
            (error) => alert(error)
        )
    }

    const onDelete = () => {

        fetch(`http://192.168.0.108:7777/api/categories/${categoryId}/`, {
            method: 'DELETE'
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert('OK')
                history.push('/admin/categories/')
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="admin-panel-form">
            <h2>Edit category - { categoryName }</h2>

            {
                category ? (
                    <Link target="_blank" to={`/${ category.childrens.length > 0 ? 'category' : 'catalog'}/${category.id}/`}>
                        Look at category
                    </Link>
                ) : null
            }

            <p>Childrens</p>
            <CategoriesTree/>

            <p>Filters</p>
            <FiltersTree />

            <p>Name</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />

            <p>Root category</p>
            <Select styles={SelectStyles} 
                isClearable
                options={optionsCategories}
                value={selectedCategory}
                onChange={e => setSelectedCategory(e)} />

            <div className="submit" onClick={onEdit}>Save</div>

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

            <div className="submit delete" onClick={onDelete}>Delete</div>

        </div>
    );
}
