import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'


export default function DeleteCategoryForm() {

    const [optionsCategories, setOptionsCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetch('http://192.168.0.108:7777/api/categories/')
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    const onSubmit = () => {

        fetch(`http://192.168.0.108:7777/api/categories/${selectedCategory.id}/`, {
            method: 'DELETE'
        })
        .then(result => result.json())
        .then(
            (result) => {
                alert('OK')
                const arr = optionsCategories.filter(e => e.value !== selectedCategory.id)
                setOptionsCategories(arr)
                setSelectedCategory(null)
            },
            (error) => alert(error)
        )
    }

    return (
        <div className="product-form">
            <h2>Delete category</h2>

            <Select styles={SelectStyles} 
                value={selectedCategory}
                options={optionsCategories} 
                onChange={e => setSelectedCategory(e)} />

            {
                selectedCategory ? (
                    <>
                        <p>Nazwa</p>
                        <span>{ selectedCategory.name }</span>

                        <p>Root category</p>
                        <span>{ (optionsCategories.filter(e => e.id === selectedCategory.parent_id)[0] ?? {}).name }</span>

                        <div className="submit" onClick={onSubmit}>Delete category</div>

                        <p>Image</p>
                        {
                            selectedCategory.image ? (
                                <div className="images-section">
                                    <div className="image-section">
                                        <div className="image-block">
                                            <img src={selectedCategory.image} alt=""/>
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
