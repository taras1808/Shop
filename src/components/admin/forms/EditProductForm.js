import { useState, useEffect } from 'react';
import './ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../styles/CustomStyle'


export default function EditProductForm() {

    const [optionsProducts, setOptionsProducts] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")

    const [image, setImage] = useState(null)
    const [oldImage, setOldImage] = useState(null)

    const [filters, setFilters] = useState([])


    const [productOptions, setProductOptions] = useState(new Map())


    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsProducts(result.map(e => { return {...e, value: e.id, label: e.name }}));
                }, (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!selectedProduct) return
        setFilters([])
        setProductOptions(new Map())
        if (optionsCategories.length === 0)
            fetch("http://192.168.0.108:7777/api/categories")
                .then(res => res.json())
                .then(
                    (result) => {
                        setOptionsCategories(result.map(e => { return { value: e.id, label: e.name }}));
                        setSelectedCategory(
                            result.filter(e => e.id === selectedProduct.category_id)
                                .map(e => { return { value: e.id, label: e.name }})[0]
                        )
                    }, (error) => {}
                )
        else
            setSelectedCategory(optionsCategories.filter(e => e.value === selectedProduct.category_id)[0])

        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id + "/options")
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(e => productOptions.set(e.filter_id, e.id))
                    setProductOptions(productOptions)
                    setFilters(filters)
                }, (error) => {}
            )

    }, [selectedProduct])

    useEffect(() => {
        if (!selectedCategory) return

        fetch('http://192.168.0.108:7777/api/filters/?categoryId=' + selectedCategory.value)
            .then(res => res.json())
            .then((result) => {
                setFilters(result)
            }, (error) => {})

    }, [selectedCategory])

    const onSubmit = () => {

        const formData = new FormData()
        if (image) formData.append('file', image)
        if (selectedCategory) formData.append('category_id', selectedCategory.value)
        formData.append('options', JSON.stringify(Array.from(productOptions)))
        formData.append('price', price)
        if (oldPrice) formData.append('old_price', oldPrice)
        if (oldImage) formData.append('image', oldImage)
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
                    setImage(null)
                    setOldImage(result.image)
                },
                (error) => alert("Product already exists")
            )
    }
    
    return (
        <div className="product-form">

            <h2>Update product</h2>

            <Select 
                styles={SelectStyles} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => {
                    setName(e.label)
                    setPrice(e.price)
                    setOldPrice(e.old_price ? e.old_price : '')
                    setOldImage(e.image)
                    setSelectedProduct(e)
                }}
            />

            {
                selectedProduct ? (
                    <>
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

                        <button className="submit" onClick={onSubmit}>Update product</button>

                        <p>New Image
                            {
                                image ? (
                                    <span className="close" onClick={() => setImage(null)}>Remove</span>
                                ) : null
                            }
                        </p>
                        
                        {
                            image ? (
                                <>
                                    <p>Name: {image.name}</p>
                                    <p>Size: {(image.size / 1024).toFixed(2)} KB</p>
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
                            oldImage ? (
                                <>
                                    <p>Old Image
                                        <span className="close" onClick={() => setOldImage(null)}>Remove</span>
                                    </p>
                                    <img src={ selectedProduct.image } alt=""/>
                                </>
                            ) : null
                        }
                        
                    </>
                ) : null
            }
        </div>
    );
    
}