import { useState, useEffect } from 'react'
import '../AdminPanelForm.css'
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { useParams } from 'react-router-dom'
import CategoriesTree from './tree/CategoriesTree'
import FiltersTree from './tree/FiltersTree'
import { Link, useHistory } from 'react-router-dom'
import SelectImageBlock from '../block/images/SelectImageBlock'
import OldImageBlock from '../block/images/OldImageBlock'


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
                history.push('../')
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="admin-panel-form">
            <h2 className="admin-panel-title">Edit category - { categoryName }</h2>

            {
                category ? (
                    <Link className="admin-panel-preview" to={`/${ category.childrens.length > 0 ? 'category' : 'catalog'}/${category.id}/`}>
                        Look at category
                    </Link>
                ) : null
            }

            <CategoriesTree/>

            <FiltersTree />

            <p className="admin-panel">Name</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />

            <p className="admin-panel">Root category</p>
            <Select styles={SelectStyles} 
                isClearable
                options={optionsCategories}
                value={selectedCategory}
                onChange={e => setSelectedCategory(e)} />

            <div className="submit" onClick={onEdit}>Save</div>

            <SelectImageBlock {...{image, setImage}} />
            <OldImageBlock {...{oldImage, setOldImage}} />

            <div className="submit delete" onClick={onDelete}>Delete</div>

        </div>
    );
}
