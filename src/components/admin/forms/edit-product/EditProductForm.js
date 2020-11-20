import { useState, useEffect } from 'react';
import './EditProductForm.css';
import Select from 'react-select'
import { SelectStylesMarginBottom, SelectStyles } from '../../../styles/CustomStyle'
import { FilterType } from '../../../../containers/filters/FiltersContainer'


export default function EditProductForm() {

    const [optionsProducts, setOptionsProducts] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [oldPrice, setOldPrice] = useState("")

    const [filters, setFilters] = useState([])


    const [productOptions, setProductOptions] = useState(new Map())


    useEffect(() => {
        fetch("http://192.168.0.108:7777/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setOptionsProducts(result.map(e => { return {...e, value: e.id, label: e.name }}));
                }, (error) => {}
            )
    }, [])

    useEffect(() => {
        if (!selectedProduct) return
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
                    console.log(result)
                    result.forEach(e => productOptions.set(e.filter_id, e.id))
                    setProductOptions(productOptions)
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

    const onSubmit = (e) => {
        e.preventDefault()

        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id, {
            method: 'PUT',
            body: JSON.stringify({ 
                name, 
                price, 
                old_price: oldPrice != '' ? oldPrice : null, 
                category_id: selectedCategory.value,
                options: Array.from(productOptions)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result => result.json())
            .then(result => {
                alert("OK")
                const arr = optionsProducts.filter(e => e.value !== result.id)
                const updated = {...result, value: result.id, label: result.name }
                setOptionsProducts([...arr, updated])
                setSelectedProduct(updated)
            })
    }
    
    return (
        <form className="form-add-producer" 
            onSubmit={onSubmit} >

            <h2>Update product</h2>

            <Select 
                styles={SelectStylesMarginBottom} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => {
                    setName(e.label)
                    setPrice(e.price)
                    setOldPrice(e.old_price ? e.old_price : '')
                    setSelectedProduct(e)
                }}
            />

            {
                selectedProduct ? (
                    <>
                        <label>Nazwa</label>
                        <input className="input-field" 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />

                        <label>Cena</label>
                        <input className="input-field" 
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)} />

                        <label>Old price</label>
                        <input className="input-field" 
                            type="text"
                            value={oldPrice}
                            onChange={e => setOldPrice(e.target.value)} />

                        <label>Kategoria:</label>
                        <Select 
                            styles={SelectStylesMarginBottom} 
                            value={selectedCategory}
                            options={optionsCategories} onChange={e => setSelectedCategory(e)} />

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

                        <button className="submit">Update product</button>

                        
                    </>
                ) : null
            }
        </form>
    );
    
}