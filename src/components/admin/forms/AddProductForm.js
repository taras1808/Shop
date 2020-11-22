import { useState, useEffect } from 'react';
import './ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../styles/CustomStyle'
import { FilterType } from '../../../containers/filters/FiltersContainer'


export default function AddProductForm() {

    const [optionsCategories, setOptionsCategories] = useState([])

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")
    const [images, setImages] = useState([])
    const [category, setCategory] = useState(null)

    const [filters, setFilters] = useState([])

    const [productOptions, setProductOptions] = useState(new Map())

    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/categories")
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(result.map(e => ({ ...e, value: e.id, label: e.name }))),
                (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!category) return
        fetch('http://192.168.0.108:7777/api/filters?categoryId=' + category.id)
			.then(res => res.json())
			.then((result) => {
                setFilters(result.filter(e => e.type === FilterType.SELECT))
                setProductOptions(new Map())
			}, (error) => {})
    }, [category])

    const onSubmit = () => {

        const formData = new FormData()
        images.forEach((image,  index) => formData.append('file_' + index, image))
        if (category) formData.append('category_id', category.id)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        if (oldPrice) formData.append('old_price', oldPrice)
        formData.append('name', name)

        fetch("http://192.168.0.108:7777/api/products", {
            method: 'POST',
            body: formData
        })
        .then(result => result.json())
        .then(
            (result) => alert("OK"),
            (error) => alert("Product already exists")
        )
    }

    return (
        <div className="product-form">
            <h2>New product</h2>

            <p>Kategoria:</p>
            <Select styles={SelectStyles} 
                value={category}
                options={optionsCategories} 
                onChange={e => setCategory(e)} />

            <p>Nazwa</p>
            <input value={name} type="text" onChange={e => setName(e.target.value)} />

            <p>Cena</p>
            <input value={price} type="text" onChange={e => setPrice(e.target.value)} />

            <p>Old price</p>
            <input value={oldPrice} type="text" onChange={e => setOldPrice(e.target.value)} />

            {
                filters.map((filter, index) => {
                    let options = filter.options.map(e => ({ value: e.id, label: e.value }))

                    return (
                        <div key={index}>
                            <p>{ filter.title }</p>
                            <Select styles={SelectStyles} 
                                options={options}
                                value={options.filter(e => e.value === productOptions.get(filter.id))}
                                onChange={e => {
                                    productOptions.set(filter.id, e.value)
                                    setProductOptions(new Map(productOptions))
                                }} />
                        </div>
                    )
                })
            }

            <div className="submit" onClick={onSubmit}>Save product</div>

            <p>Image</p>

            <label className="select-image">
                Select image...
                <input type="file"
                    multiple 
                    accept="image/png, image/jpeg" 
                    onChange={e => {
                        const array = [...images]
                        Array.from(e.target.files).forEach(e => {
                            if (!images.map(e => e.name).includes(e.name)) {
                                array.push(e)
                            }
                        })
                        setImages(array)
                        e.target.value = ''
                    }} />
            </label>

            <div className="images-section">
                {
                    images.map((image, index) => (
                        <div key={index} className="image-section">

                            <p>Name:
                                <span className="close" onClick={() => {
                                    setImages(images.filter(e => e !== image))
                                }}>Remove</span>
                            </p>
                            <span>{image.name} </span>

                            <p>Size:</p>
                            <span>{(image.size / 1024).toFixed(2)} KB</span>

                            <div className="image-block">
                                <img src={URL.createObjectURL(image) } alt=""/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
