import { useState, useEffect } from 'react';
import './AddProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { FilterType } from '../../../../containers/filters/FiltersContainer'


export default function AddProductForm() {

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState(null)

    const [filters, setFilters] = useState([])

    const [productOptions, setProductOptions] = useState(new Map())

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsCategories(result.map(e => { return { ...e, value: e.id, label: e.name }}));
                },
                (error) => {}
            )

    }, [])

    useEffect(() => {
        if (!category) return

        fetch('http://192.168.0.108:7777/api/categories/' +  category + '/fitlers')
			.then(res => res.json())
			.then((result) => {
                setFilters(result.filter(e => e.type === FilterType.SELECT))
                setProductOptions(new Map())
			}, (error) => {})

    }, [category])

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', image)
        formData.append('category', category)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        formData.append('old_price', oldPrice)
        formData.append('name', name)

        fetch("http://192.168.0.108:7777/api/products", {
            method: 'POST',
            body: formData
        })
        .then(result => result.json())
        .then(result => {
            alert("OK")
        })
    }
    
    return (
        <form className="add-product-form" 
            onSubmit={onSubmit}>
            <h2>New product</h2>

            <label>Kategoria:</label>
            <Select styles={SelectStyles} 
                options={optionsCategories} 
                onChange={e => setCategory(e.value)} />

            <label>Nazwa</label>
            <input type="text" 
                onChange={e => setName(e.target.value)} />

            <label>Cena</label>
            <input type="text" 
                onChange={e => setPrice(e.target.value)} />

            <label>Old price</label>
            <input type="text"
                onChange={e => setOldPrice(e.target.value)} />

            <label>Image</label>

            {image ? (
                <span className="close" onClick={() => setImage(null)}>Remove</span>
            ) : null}

            {
                image ? (
                    <>
                        <img src={URL.createObjectURL(image) } alt=""/>
                    </>
                ) : (
                    <label className="select-image">
                        Select image...
                        <input type="file" 
                            accept="image/png, image/jpeg" 
                            onChange={e => setImage(e.target.files[0])} />
                    </label>
                )
            }



            {
                filters.map((filter, index) => {
                    let options = filter.options.map(e => ({ value: e.id, label: e.value }))
                        
                    return (
                        <>
                            <label>{ filter.title }</label>
                            <Select styles={SelectStyles} 
                                options={options}
                                value={options.filter(e => e.value === productOptions.get(filter.id))}
                                onChange={e => {
                                    productOptions.set(filter.id, e.value)
                                    setProductOptions(new Map(productOptions))
                                }} />
                        </>
                    )
                })
            }

            <button className="submit">Save product</button>

        </form>
    );
}
