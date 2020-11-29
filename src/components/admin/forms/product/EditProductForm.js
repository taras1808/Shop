import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { Link } from "react-router-dom";


export default function EditProductForm() {

    const [optionsProducts, setOptionsProducts] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")

    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [filters, setFilters] = useState([])

    const [productOptions, setProductOptions] = useState(new Map())

    useEffect(() => {

        fetch('http://192.168.0.108:7777/api/products')
            .then(res => res.json())
            .then(
                (result) => setOptionsProducts(
                    result.map(e => ({...e, value: e.id, label: e.name }))
                ),
                (error) => {}
            )

        fetch('http://192.168.0.108:7777/api/categories')
            .then(res => res.json())
            .then(
                (result) => setOptionsCategories(
                    result.map(e => ({ value: e.id, label: e.name }))
                ),
                (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!selectedProduct) return
        setFilters([])
        fetch('http://192.168.0.108:7777/api/products/' + selectedProduct.id + '/options')
            .then(res => res.json())
            .then(
                (result) => {
                    const options = new Map()
                    result.forEach(e => options.set(e.filter_id, e.id))
                    setProductOptions(options)
                }, (error) => {}
            )

    }, [selectedProduct])

    useEffect(() => {
        if (!selectedCategory) return
        fetch('http://192.168.0.108:7777/api/filters/?categoryId=' + selectedCategory.value)
            .then(res => res.json())
            .then(
                (result) => setFilters(result),
                (error) => {}
            )

    }, [selectedCategory])

    const onSubmit = () => {

        const formData = new FormData()
        images.forEach((image,  index) => formData.append('file_' + index, image))
        if (selectedCategory) formData.append('category_id', selectedCategory.value)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        if (oldPrice) formData.append('old_price', oldPrice)
        formData.append('images', JSON.stringify(oldImages))
        formData.append('name', name)

        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id, {
            method: 'PUT',
            body: formData
        })
            .then(result => result.json())
            .then(
                (result) => {
                    alert("OK")
                    const arr = optionsProducts.filter(e => e.value !== result.id)
                    const updated = {...result, value: result.id, label: result.name }
                    setOptionsProducts([...arr, updated])
                    setSelectedProduct(updated)
                    setImages([])
                    setOldImages(result.images)
                },
                (error) => alert(error)
            )
    }
    
    return (
        <div className="product-form">

            <h2>Edit product</h2>

            <Select 
                styles={SelectStyles} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => {
                    setName(e.label)
                    setPrice(e.price)
                    setOldPrice(e.old_price ?? '')
                    setOldImages(e.images)
                    setImages([])
                    setSelectedCategory(
                        optionsCategories.filter(item => item.value === e.category_id)[0]
                    )
                    setSelectedProduct(e)
                }} />

            {
                selectedProduct ? (
                    <>
                        <Link target="_blank" to={`/product/${selectedProduct.id}/`}>Look at product</Link>

                        <p>Nazwa</p>
                        <input className="input-field" 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />

                        <p>Cena</p>
                        <input className="input-field" 
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)} />

                        <p>Old price</p>
                        <input className="input-field" 
                            type="text"
                            value={oldPrice}
                            onChange={e => setOldPrice(e.target.value)} />

                        <p>Kategoria:</p>
                        <Select 
                            isClearable
                            styles={SelectStyles} 
                            value={selectedCategory}
                            options={optionsCategories} onChange={e => setSelectedCategory(e)} />

                        {
                            filters.map((filter, index) => {
                                let options = filter.options.map(e => ({ value: e.id, label: e.value }))
                                    
                                return (
                                    <div key={index}>
                                        <p>{ filter.title }</p>
                                        <Select styles={SelectStyles} 
                                            isClearable
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

                        <button className="submit" onClick={onSubmit}>Save product</button>

                        <p>New Images</p>

                        <label className="select-image">
                            Select image...
                            <input type="file"
                                value={null}
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
                                        <span>{ image.name }</span>
                                        <p>Size: </p>
                                        <span>{(image.size / 1024).toFixed(2)} KB</span>

                                        <div className="image-block">
                                            <img src={URL.createObjectURL(image) } alt=""/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>


                        <p>Old Images</p>
                        <div className="images-section">
                            {
                                oldImages.map((image, index) => (
                                    <div key={index} className="image-section">
                                        <p>
                                            <span className="close" onClick={() => {
                                                setOldImages(oldImages.filter(e => e !== image))
                                            }}>Remove</span>
                                        </p>
                                        
                                        <div className="image-block">
                                            <img src={image.image} alt=""/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </>
                ) : null
            }
        </div>
    );
    
}