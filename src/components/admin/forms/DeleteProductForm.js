import { useState, useEffect } from 'react';
import './ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../styles/CustomStyle'

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
        <div className="product-form">

            <h2>Delete product</h2>

            <Select 
                styles={SelectStyles} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => setSelectedProduct(e) }
            />

            {
                selectedProduct ? (
                    <>
                        <p>Nazwa: {selectedProduct.name}</p>

                        <p>Cena: {selectedProduct.price}</p>

                        <p>Kategoria: {category ? category.name : null}</p>

                        <p>Image:</p>
                        { selectedProduct.image ? (<img src={selectedProduct.image} alt=""/>) : null }

                        <button className="submit" onClick={onSubmit}>Delete product</button>
                    </>
                ) : null
            }
        </div>
    );
    
}