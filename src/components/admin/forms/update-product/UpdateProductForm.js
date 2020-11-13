import { useState, useEffect } from 'react';
import './UpdateProductForm.css';
import Select from 'react-select'
import { SelectStylesMarginBottom, SelectStyles } from '../../../styles/CustomStyle'

export default function UpdateProductForm() {

    const [optionsProducts, setOptionsProducts] = useState([])
    const [optionsCategories, setOptionsCategories] = useState([])
    const [optionsProducers, setOptionsProducers] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProducer, setSelectedProducer] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

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

    }, [selectedProduct])

    useEffect(() => {
        if (!selectedProduct || !selectedCategory) return

        fetch("http://192.168.0.108:7777/api/categories/" + selectedCategory.value + "/producers")
            .then(res => res.json())
            .then(
                (result) => {
                    setOptionsProducers(result.map(e => { return { value: e.id, label: e.name }}));
                    setSelectedProducer(
                        result.filter(e => e.id === selectedProduct.producer_id)
                            .map(e => { return { value: e.id, label: e.name }})
                    )
                }, (error) => {}
            )
    }, [selectedCategory])
    

    const onSubmit = (e) => {
        e.preventDefault()
        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category_id: selectedCategory.value, producer_id: selectedProducer.value }),
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
            method="PUT" 
            onSubmit={onSubmit} 
            action="">

            <h2>Select a product</h2>

            <Select 
                styles={SelectStylesMarginBottom} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => {
                    setName(e.label)
                    setPrice(e.price)
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
                            onChange={e => setName(e.target.value)}/>

                        <label>Cena</label>
                        <input className="input-field" 
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}/>

                        <label>Kategoria:</label>
                        <Select 
                            styles={SelectStylesMarginBottom} 
                            value={selectedCategory}
                            options={optionsCategories} onChange={e => setSelectedCategory(e)}
                        />

                        <label>Producent:</label>
                        <Select 
                            styles={SelectStyles} 
                            value={selectedProducer}
                            options={optionsProducers} onChange={e => setSelectedProducer(e)}
                        />

                        <button className="submit">Update producer</button>
                    </>
                ) : null
            }
        </form>
    );
    
}