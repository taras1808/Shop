import { useState, useEffect } from 'react';
import './DeleteProductForm.css';
import Select from 'react-select'
import { SelectStylesMarginBottom, SelectStyles } from '../../../styles/CustomStyle'

export default function DeleteProductForm() {

    const [optionsProducts, setOptionsProducts] = useState([])

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [category, setCategory] = useState(null)
    

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
            fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id)
                .then(res => res.json())
                .then(
                    (result) => {
                        setCategory(result.category)
                    }, (error) => {}
                )
    }, [selectedProduct])
    

    const onSubmit = (e) => {
        e.preventDefault()
        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id, {
            method: 'DELETE'
        }).then(result => result.json())
            .then(result => {
                alert("OK")
                const arr = optionsProducts.filter(e => e.value !== selectedProduct.id)
                setOptionsProducts(arr)
                setSelectedProduct(null)
            })
    }
    
    return (
        <form className="form-add-producer" 
            onSubmit={onSubmit} >

            <h2>Delete product</h2>

            <Select 
                styles={SelectStylesMarginBottom} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => setSelectedProduct(e) }
            />

            {
                selectedProduct ? (
                    <>
                        <label>Nazwa: {selectedProduct.name}</label>

                        <label>Cena: {selectedProduct.price}</label>

                        <label>Kategoria: {category ? category.name : null}</label>

                        <img src={selectedProduct.image} alt=""/>

                        <button className="submit">Delete product</button>
                    </>
                ) : null
            }
        </form>
    );
    
}