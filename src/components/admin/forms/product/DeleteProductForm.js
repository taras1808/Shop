import { useState, useEffect } from 'react';
import '../ProductForm.css';
import Select from 'react-select'
import { SelectStyles } from '../../../styles/CustomStyle'
import { Link } from "react-router-dom";


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
        fetch("http://192.168.0.108:7777/api/products/" + selectedProduct.id, 
            { 
                method: 'DELETE' 
            })
            .then(result => result.json())
            .then(
                result => {
                    alert("OK")
                    const arr = optionsProducts.filter(e => e.value !== selectedProduct.id)
                    setOptionsProducts(arr)
                    setSelectedProduct(null)
                },
                error => alert(error)
            )
    }
    
    return (
        <div className="product-form">

            <h2>Delete product</h2>

            <Select 
                isClearable
                styles={SelectStyles} 
                options={optionsProducts}
                value={selectedProduct}
                onChange={e => setSelectedProduct(e) }
            />

            {
                selectedProduct ? (
                    <>
                        <Link target="_blank" to={`/product/${selectedProduct.id}/`}>Look at product</Link>

                        <p>Nazwa:</p> <span>{selectedProduct.name}</span>

                        <p>Cena:</p> <span>{selectedProduct.price}</span>

                        <p>Product information:</p> <span>{selectedProduct.info}</span>

                        <p>Kategoria:</p>  {category ? <span>{category.name}</span> : null}

                        <p>Images</p>
                        <div className="images-section">
                            {
                                selectedProduct.images.map((image, index) => (
                                    <div key={index} className="image-section">
                                        <div className="image-block">
                                            <img src={image.image} alt=""/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <button className="submit" onClick={onSubmit}>Delete product</button>
                    </>
                ) : null
            }
        </div>
    );
    
}